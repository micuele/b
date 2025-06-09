// Config
const CLIENT_ID = 'your-client-id-here';
const REDIRECT_URI = 'https://yourusername.github.io/spotify-emoji/';
const SCOPES = ['user-read-recently-played'];

// Step 1: Redirect to Spotify login if no token
function redirectToSpotifyAuth() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}`;
    window.location.href = authUrl;
}

// Step 2: Extract token from URL after redirect
function getTokenFromUrl() {
    const hash = window.location.hash;
    if (!hash) return null;
    const params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
}

// Step 3: Get recently played tracks
async function fetchRecentlyPlayed(token) {
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    return data.items.map(item => item.track.id);
}

// Step 4: Get audio features for tracks
async function fetchAudioFeatures(token, trackIds) {
    const batches = [];
    for (let i = 0; i < trackIds.length; i += 100) {
        const batch = trackIds.slice(i, i + 100).join(',');
        const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${batch}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        batches.push(...data.audio_features);
    }
    return batches;
}

// Step 5: Analyze and pick an emoji
function getEmojiFromFeatures(features) {
    const avg = {
        danceability: 0,
        valence: 0,
        energy: 0
    };

    features.forEach(f => {
        if (f) {
            avg.danceability += f.danceability;
            avg.valence += f.valence;
            avg.energy += f.energy;
        }
    });

    const total = features.length;
    avg.danceability /= total;
    avg.valence /= total;
    avg.energy /= total;

    // Simple if-else emoji mapping
    if (avg.valence > 0.7 && avg.danceability > 0.6) return '🕺';
    if (avg.energy > 0.7) return '🔥';
    if (avg.valence < 0.3) return '😭';
    if (avg.danceability < 0.3) return '🧘';
    return '🎧';
}

// Main
(async function run() {
    const token = getTokenFromUrl();
    if (!token) {
        redirectToSpotifyAuth();
        return;
    }

    document.body.innerHTML = '<p>Loading your emoji...</p>';

    try {
        const trackIds = await fetchRecentlyPlayed(token);
        const features = await fetchAudioFeatures(token, trackIds);
        const emoji = getEmojiFromFeatures(features);

        document.body.innerHTML = `<h1>Your emoji is: ${emoji}</h1>`;
    } catch (e) {
        document.body.innerHTML = `<p>Error: ${e.message}</p>`;
    }
})();
