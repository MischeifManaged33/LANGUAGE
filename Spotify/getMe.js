const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDnIKHIvzB4ko7asOjJKcP9zOWICLylLOBpWnMF1iNtM3Le5fVupSwwU-NH0mZMuSQvn8KjNAJaRb2tcZ80BjBc4n85qFku4Vwa3tHRaXgUMfK6Ikpm6WHiEdDYlz88aty981CnedwA2XOsLbYO9cAGUAMmA0NgNfL6MXcCDsC4uykDSSc7W3ctVyCAvuWiEEZxvz0PwYlt_ODfrEdMxsiL6N7rPupeETOZxkUPZa7XnnZCAXto_j_6iO6gR5jAqF4WVaEaZNztoN1zpDl7XrBMLcirJ8Yi7fhJq5c6702GBto7SjJq";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();