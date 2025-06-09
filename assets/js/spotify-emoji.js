// Config
const CLIENT_ID = '33d362ca24344174ba29627c44204d19';
const REDIRECT_URI = 'https://micuele.de/spotify/'; // Ensure this is registered in your Spotify App settings
const SCOPES = ['user-read-recently-played'];

// --- Auth ---
function redirectToSpotifyAuth() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}`;
    window.location.href = authUrl;
}

function getTokenFromUrl() {
    const hash = window.location.hash;
    if (!hash) return null;
    const params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
}

// --- API Calls ---
async function fetchRecentlyPlayed(token) {
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', { // Correct API endpoint with limit
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to fetch recently played: ${res.status} ${res.statusText} - ${errorData.error.message}`);
    }
    const data = await res.json();
    return data.items.map(item => item.track.id);
}

async function fetchAudioFeatures(token, trackIds) {
    const batches = [];
    // Spotify's Audio Features endpoint takes up to 100 track IDs at once
    for (let i = 0; i < trackIds.length; i += 100) {
        const batch = trackIds.slice(i, i + 100).join(',');
        const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${batch}`, { // Correct API endpoint
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Failed to fetch audio features: ${res.status} ${res.statusText} - ${errorData.error.message}`);
        }
        const data = await res.json();
        batches.push(...data.audio_features);
    }
    return batches;
}

// --- Emoji Logic (No changes needed here) ---
function getEmojiFromFeatures(features) {
    const avg = { danceability: 0, valence: 0, energy: 0 };

    features.forEach(f => {
        if (f) { // Ensure feature object exists
            avg.danceability += f.danceability;
            avg.valence += f.valence;
            avg.energy += f.energy;
        }
    });

    const total = features.length;
    if (total === 0) return '🤷'; // No tracks, no emoji

    avg.danceability /= total;
    avg.valence /= total;
    avg.energy /= total;

    // Determine emoji based on average features
    if (avg.valence > 0.7 && avg.danceability > 0.6) return '🕺'; // Happy and dancy
    if (avg.energy > 0.7) return '🔥'; // High energy
    if (avg.valence < 0.3) return '😭'; // Sad/low valence
    if (avg.danceability < 0.3) return '🧘'; // Chill/low danceability
    return '🎧'; // Default, just listening
}

// --- Main Execution ---
async function run() {
    const app = document.getElementById('app');
    let token = getTokenFromUrl();

    if (!token) {
        // If no token, redirect to Spotify for authorization
        redirectToSpotifyAuth();
        return; // Stop execution here
    }

    // Clean the URL hash after getting the token for a cleaner look
    window.history.replaceState({}, document.title, window.location.pathname);

    try {
        app.innerHTML = '<p>Fetching your recently played tracks...</p>';
        const trackIds = await fetchRecentlyPlayed(token);

        if (trackIds.length === 0) {
            app.innerHTML = '<p>No recently played tracks found. Listen to some music on Spotify!</p>';
            return;
        }

        app.innerHTML = '<p>Analyzing audio features...</p>';
        const features = await fetchAudioFeatures(token, trackIds);
        
        // Filter out null features if any tracks didn't have audio features data
        const validFeatures = features.filter(f => f !== null);

        if (validFeatures.length === 0) {
            app.innerHTML = '<p>Could not retrieve audio features for your recently played tracks. Try again later!</p>';
            return;
        }

        const emoji = getEmojiFromFeatures(validFeatures);
        app.innerHTML = `<h1>Your Spotify Emoji: ${emoji}</h1>`;
    } catch (e) {
        console.error("Error in run function:", e);
        app.innerHTML = `<p>Error: ${e.message}. Please try again or check your Spotify Developer settings.</p>`;
        // Optionally, redirect to re-authenticate if token expired or invalid
        if (e.message.includes('401') || e.message.includes('token')) {
             app.innerHTML += '<p>It looks like your Spotify token might be expired or invalid. Redirecting to re-authenticate...</p>';
             setTimeout(redirectToSpotifyAuth, 3000); // Redirect after 3 seconds
        }
    }
}

// Run the application when the script loads
run();
