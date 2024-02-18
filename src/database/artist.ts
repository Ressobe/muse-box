import db from "@/src/lib/db";

export async function getAllArtists() {
    return await db.artist.findMany();
}

export async function getArtist(artistId: string) {
    return await db.artist.findUnique({
        where: {
            id: artistId
            
        },
        include: {
            albums: true,
            comments: true,
            stats: true,
            external_links: true,
            tags: true,
        }
   });
}

export async function createArtistComment(artistId: string, creatorId: string, rate: number, comment: string) {
    await db.artist.update({
        where: {id: artistId},
        data: {
            comments: {
                create: {
                    rate: rate,
                    content: comment,
                    ownerId: creatorId,
                    type: "ARTIST"
                }
            }
        }
    });
}