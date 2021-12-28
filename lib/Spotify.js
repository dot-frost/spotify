import SpotifyWebAPI from "spotify-web-api-node";

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read'
]


const params = {
    scope : scopes,
}

const queryParamsString = new URLSearchParams(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamsString.toString()

const spotifyAPI = new SpotifyWebAPI({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyAPI

export { LOGIN_URL }
