import db from "@/src/lib/db";

export async function getAllArtists(take: number) { 
    return await db.artist.findMany({take: take, include: {stats: true}});
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

export async function followArtist(artistId: string, profileId: string) {
    await db.profile.update({
        where: { id: profileId },
        data: {
            followedArtists: {
                connect: {
                    id: artistId
                }
            }
        }
    });
    await db.artist.update({
        where: {id : artistId},
        data: {
            stats: {
                update: {
                    amount_of_followers: {increment: 1}
                }
            }
        }
    });
}

export async function unfollowArtist(artistId: string, profileId: string) {
    await db.profile.update({
        where: { id: profileId },
        data: {
            followedArtists: {
                disconnect: {
                    id: artistId
                }
            }
        }
    });
    await db.artist.update({
        where: {id : artistId},
        data: {
            stats: {
                update: {
                    amount_of_followers: {decrement: 1}
                }
            }
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