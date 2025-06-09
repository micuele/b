// Config
const CLIENT_ID = '33d362ca24344174ba29627c44204d19';
const REDIRECT_URI = 'https://micuele.de/spotify/';
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
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    return data.items.map(item => item.track.id);
}

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

// --- Emoji Logic ---
function getEmojiFromFeatures(features) {
    const avg = { danceability: 0, valence: 0, energy: 0 };

    features.forEach(f => {
        if (f) {
            avg.danceability += f.danceability;
            avg.valence += f.valence;
            avg.energy += f.energy;
        }
    });

    const total = features.length;
    if (total === 0) return '🤷';

    avg.danceability /= total;
    avg.valence /= total;
    avg.energy /= total;

    if (avg.valence > 0.7 && avg.danceability > 0.6) return '🕺';
    if (avg.energy > 0.7) return '🔥';
    if (avg.valence < 0.3) return '😭';
    if (avg.danceability < 0.3) return '🧘';
    return '🎧';
}

// --- Main ---
async function run() {
    const token = getTokenFromUrl();
    const app = document.getElementById('app');

    if (!token) {
        redirectToSpotifyAuth();
        return;
    }

    // Clean URL
    window.history.replaceState({}, document.title, "/spotify/");

    try {
        const trackIds = await fetchRecentlyPlayed(token);
        const features = await fetchAudioFeatures(token, trackIds);
        const emoji = getEmojiFromFeatures(features);
        app.innerHTML = `<h1>Your emoji is: ${emoji}</h1>`;
    } catch (e) {
        app.innerHTML = `<p>Error: ${e.message}</p>`;
    }
}

run();
