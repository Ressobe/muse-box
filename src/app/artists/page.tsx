import db from "@/src/lib/db";
import Link from "next/link";

async function getArtists() {
    return await db.artist.findMany();
}

export default async function Artists() {
    const artists = await getArtists();
    return (
        <div className="flex flex-col justify-center items-center">
            {artists.map((item) => {
                return <Link href={`/artists/${encodeURIComponent(item.name)}`} className="cursor-pointer hover:underline" key={item.spotify_id}> {item.name} </Link>;
            })}
        </div>
    );
}