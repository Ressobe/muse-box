import db from "@/src/lib/db";

export async function createPlaylist(ownerId: string, playlistName: string, isPublic = false) {
    await db.profile.update({
        where: {id: ownerId},
        data: {
            playlist: {
                create: {
                    name: playlistName,
                    isPublic: isPublic,
                }
            }
        }
    })
}


export async function addToPlaylist(playlistId: string, ...tracksId: string[]) {
    await db.playlist.update({
        where: {id: playlistId},
        data: {
            tracks: {
                connect: tracksId.map((track) => ({
                    id: track
                }))
            }
        }
    })
}

export async function removePlaylist(playlistId: string) {
    await db.playlist.delete({
        where: {id: playlistId}
    });
}