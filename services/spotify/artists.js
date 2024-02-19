import { appendFileSync } from "node:fs";
import { getToken } from "./spotifyAPI.js";

async function getPlaylistsId(accessToken) {
  const categoryId = 'hiphop';
  const playlistUrl = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
  const playlistParams = {
    country: 'US',
    limit: 20,
  };
  const playlistHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(`${playlistUrl}?${new URLSearchParams(playlistParams)}`, {
    method: 'GET',
    headers: playlistHeaders,
  });

  const playlistData = await response.json();

  console.log(playlistData);

  if (playlistData.playlists && playlistData.playlists.items && playlistData.playlists.items.length > 0) {
    return playlistData.playlists.items;
  } else {
    throw new Error("Nie znaleziono playlisty w kategorii 'hipop'.");
  }
}

async function saveArtistsToFile(artists) {
  for (let i = 0; i < artists.length; i++){
    const a = artists[i];
      appendFileSync(file, `${a.name},${a.id}\n`, "utf8");
  }
}

async function getTopArtists(accessToken, playlistId) {
  const tracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const tracksParams = {
    limit: 50,
  };
  const playlistHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(`${tracksUrl}?${new URLSearchParams(tracksParams)}`, {
    method: 'GET',
    headers: playlistHeaders,
  });

  const tracksData = await response.json();

  // Sprawdzenie, czy 'items' jest zdefiniowane
  if (tracksData.items && tracksData.items.length > 0) {
    // Przetwarzanie informacji o utworach (np. wydobycie informacji o artystach)
    tracksData.items.forEach(async(item) => {
      await saveArtistsToFile(item.track.artists);
    });
  } else {
    console.error('Nie znaleziono utworów w playliście.');
  }
}

const file = "./artists.txt";
const token = await getToken();
const playlists = await getPlaylistsId(token);

playlists.forEach(async (item) => {
  await getTopArtists(token, item.id)
})