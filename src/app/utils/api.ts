import db from "@/src/lib/db";

// Add try catch blocks :)

export async function getArtist(name: string) {
    return await db.artist.findUnique({
    where: {
        name: name
    },
   });
}

export async function getAlbums(creatorId: number) {
    return await db.album.findMany({
        where: {
            creatorId : creatorId
        }
    })
}

export async function getAlb(creatorName: string, name: string) {
    const artist = await getArtist(creatorName);

    return await db.album.findFirst({
        where: {
            creatorId: artist?.id,
            title: name,
        }
    });
}

export async function getSongs(creatorName: string, albumName: string) {
    const artist = await getArtist(creatorName);
    const album = await db.album.findFirst({
            where: {
                title: albumName,
                creatorId: artist?.id,
            }
    });

    const songs = await db.song.findMany({
      where: {
        albumId: album?.id,
        album: {
          creatorId: artist?.id
        }
      }
    });

    return songs;
}