const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDnIKHIvzB4ko7asOjJKcP9zOWICLylLOBpWnMF1iNtM3Le5fVupSwwU-NH0mZMuSQvn8KjNAJaRb2tcZ80BjBc4n85qFku4Vwa3tHRaXgUMfK6Ikpm6WHiEdDYlz88aty981CnedwA2XOsLbYO9cAGUAMmA0NgNfL6MXcCDsC4uykDSSc7W3ctVyCAvuWiEEZxvz0PwYlt_ODfrEdMxsiL6N7rPupeETOZxkUPZa7XnnZCAXto_j_6iO6gR5jAqF4WVaEaZNztoN1zpDl7XrBMLcirJ8Yi7fhJq5c6702GBto7SjJq";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getPlaylist(playlistID){
    const playlist = await spotifyApi.getPlaylistTracks(playlistID);
    for(let item of playlist.body.items){
        console.log(item.track.name);
    }
}

getPlaylist('0ZRnqlBSbc9lprG8w7HvMK');