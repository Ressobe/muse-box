// type of the comment (artist / album / song)
// id that depends of the type
// rating
// comment (content)
// user that send this request

import { NextResponse } from "next/server";
import db from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({message: 'user in not authenticated'}, { status: 401 });
    }

    const body = await req.json();
    const {type, id, rating, comment} = body;

    if (type !== "artist" && type !== "album" && type !== "song") {
        return NextResponse.json({message: 'something went wrong'}, { status: 500 });
    }

    const userId = Number(session.user.userid);

    if (type === "artist") {
        const artist = await db.artist.findUnique({
            where: { id }
        });

        await db.comment.create({
            data: {
                content: comment,
                rate: rating,
                artistId: artist?.id,
                userId: userId,
            }
        });
    }

    if (type === "album") {
        const album = await db.album.findUnique({
            where: { id }
        });

        await db.comment.create({
            data: {
                content: comment,
                rate: rating,
                albumId: album?.id,
                userId: userId, 
            }
        });
    }

    if (type === "song") {
        const song = await db.song.findUnique({
            where: { id }
        });

        await db.comment.create({
            data: {
                content: comment,
                rate: rating,
                songId: song?.id,
                userId: userId,
            }
        });
    }


    return NextResponse.json({message: "Comment created successful"}, {status: 201});
}