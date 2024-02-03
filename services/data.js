import { appendFileSync } from "node:fs";

const file = "./artists.txt"

// check if artist in database first
// for every artist i have to find all albumns (t1) and songs (t2)
// create records in database for this artist
//
async function getToken() {
  // Konfiguracja autoryzacji
  const authString = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
  const base64AuthString = btoa(authString);

  // Endpoint do uzyskania tokena dostępu
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  // Parametry do żądania tokena dostępu
  const tokenParams = {
    grant_type: 'client_credentials',
  };

  // Nagłówki zawierające zakodowane dane autoryzacyjne
  const tokenHeaders = {
    Authorization: `Basic ${base64AuthString}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: tokenHeaders,
    body: new URLSearchParams(tokenParams),
  });

  const data = await response.json();
  return data.access_token;
}

const token = await getToken()


// async function getPlaylistsId(accessToken) {
//   const categoryId = 'hiphop';
//   const playlistUrl = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
//   const playlistParams = {
//     country: 'US',
//     limit: 20,
//   };
//   const playlistHeaders = {
//     Authorization: `Bearer ${accessToken}`,
//   };
//
//   const response = await fetch(`${playlistUrl}?${new URLSearchParams(playlistParams)}`, {
//     method: 'GET',
//     headers: playlistHeaders,
//   });
//
//   const playlistData = await response.json();
//   if (playlistData.playlists && playlistData.playlists.items && playlistData.playlists.items.length > 0) {
//     return playlistData.playlists.items;
//   } else {
//     throw new Error("Nie znaleziono playlisty w kategorii 'hipop'.");
//   }
// }
//
// const playlists = await getPlaylistsId(token)
//
//
// async function saveArtists(artists) {
//   for (let i = 0; i < artists.length; i++){
//     const a = artists[i];
//     await appendFileSync(file, `${a.name},${a.id}\n`, "utf8");
//   }
// }
//
// async function getTopArtists(accessToken, playlistId) {
//   const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
//   const tracksParams = {
//     limit: 50,
//   };
//   const playlistHeaders = {
//     Authorization: `Bearer ${accessToken}`,
//   };
//
//   const response = await fetch(`${tracksUrl}?${new URLSearchParams(tracksParams)}`, {
//     method: 'GET',
//     headers: playlistHeaders,
//   });
//
//   const tracksData = await response.json();
//
//   // Sprawdzenie, czy 'items' jest zdefiniowane
//   if (tracksData.items && tracksData.items.length > 0) {
//     // Przetwarzanie informacji o utworach (np. wydobycie informacji o artystach)
//     tracksData.items.forEach(async(item) => {
//       await saveArtists(item.track.artists);
//     });
//   } else {
//     console.error('Nie znaleziono utworów w playliście.');
//   }
// }
//
// playlists.forEach(async (item) => {
//   await getTopArtists(token, item.id)
// })

const tacoID = "7CJgLPEqiIRuneZSolpawQ"

async function getAlbumInfo(accessToken, albumId) {
  const albumURL = `https://api.spotify.com/v1/albums/${albumId}`;
  const albumHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(albumURL, {
    method: 'GET',
    headers: albumHeaders,
  })    

  const albumData = await response.json();

  console.log(albumData.name)

}

async function getArtistAlbums(accessToken, artistID) {
  const albumsURL = `https://api.spotify.com/v1/artists/${artistID}/albums`

  const albumsHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(`${albumsURL}`, {
    method: 'GET',
    headers: albumsHeaders,
  });

  const albumsData = await response.json();

  if (albumsData.items && albumsData.items.length > 0 ) {
    albumsData.items.forEach(item => {
      getAlbumInfo(accessToken, item.id);
    })
  }

  return albumsData;
}


await getArtistAlbums(token, tacoID);
