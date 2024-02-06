import { getToken, getAlbumInfo, getArtistAlbums, getArtistInfo } from './spotifyAPI.js';
import db from "../src/lib/db.js"

const accessToken = await getToken();

async function createAlbums(artistID) {
  const albumsData = await getArtistAlbums(accessToken, artistID);
  let albums = [];

  if (albumsData.items && albumsData.items.length > 0) {
    await Promise.all(albumsData.items.map(async item => {
       if(item !== undefined) {
          const albumInfo = await getAlbumInfo(accessToken, item.id);

          const alb = {
            title: albumInfo.name,
            img: albumInfo.images[0].url,
            release_date: albumInfo.release_date,
            spotify_link: albumInfo.external_urls.spotify,
            total_tracks: albumInfo.total_tracks,
            songs: [],
          }

          albumInfo.tracks.items.forEach(track => {
              const t = {
                title: track.name,
                track_number: track.track_number,
                spotify_link: track.external_urls.spotify,
                duration_ms: track.duration_ms,
              };
              alb.songs.push(t);
          })

          albums.push(alb);
       };
      })
    )
  }
  return albums;
}

async function createArtist(name, artistID) {
  // Sprawdź, czy artysta już istnieje w bazie danych
  const existingArtist = await prisma.artist.findUnique({
    where: {
      name: name,
    },
  });

  if (existingArtist) {
    console.log('Artist exist in database');
    return;
  }

  const artistData = await getArtistInfo(accessToken, artistID);
  const albums = await createAlbums(artistID);


 await prisma.artist.create({
    data: {
      name: name,
      avg_rate: 0,
      img: artistData.images[0].url,
      albums: {
        create: albums.map((album) => ({
          title: album.title,
          img: album.img,
          // release_date: album.release_date,
          total_tracks: album.total_tracks,
          spotify_link: album.spotify_link,
          songs: {
            create: album.songs.map((song) => ({
              title: song.title,
              track_number: song.track_number,
              spotify_link: song.spotify_link,
              duration_ms: song.duration_ms,
              genre: {
                connectOrCreate: {
                  where: { name: 'rap' }, // Tutaj możesz dostosować do swoich potrzeb
                  create: { name: 'rap' },
                },
              },
            }))
          }
        }))
      },
      spotify_id: artistID,
    }})
}


const path = './artists2.txt';
const file = Bun.file(path);
const arrBuf = await file.arrayBuffer();

const decoder = new TextDecoder();
const str = decoder.decode(arrBuf);


const artistsData = str.split("\n").map(item => {
  const [name, spotifyId] = item.split(",");
  if (name.length > 0) {
    return { name, spotifyId };
  }
}).filter(Boolean); // Usuń wartości null lub undefined

for (const artistData of artistsData) {
  await createArtist(artistData.name, artistData.spotifyId);
  await new Promise(resolve => setTimeout(resolve, 5000));
}
