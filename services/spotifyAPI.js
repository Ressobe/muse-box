export async function getToken() {
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

export async function getAlbumInfo(accessToken, albumId) {
  const albumURL = `https://api.spotify.com/v1/albums/${albumId}`;
  const albumHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(albumURL, {
    method: 'GET',
    headers: albumHeaders,
    verbose: true,
    timeout: 15000, // Przykładowy limit czasu w milisekundach
  })    
  const albumData = await response.json();
  return albumData;
}

export async function getArtistAlbums(accessToken, artistID) {
  const albumsURL = `https://api.spotify.com/v1/artists/${artistID}/albums`
  const albumsHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(`${albumsURL}`, {
    method: 'GET',
    headers: albumsHeaders,
    verbose: true,
    timeout: 15000, // Przykładowy limit czasu w milisekundach
  });

  const albumsData = await response.json();
  return albumsData;
}