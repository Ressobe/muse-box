import SpotifyButton from "@/src/components/SpotifyButton";
import db from "@/src/lib/db";

async function getSongs() {
    return await db.song.findMany();
}

export default async function Songs() {
    const songs = await getSongs();
    return (
        <ul className="flex flex-col gap-4 pl-4">
            {songs.map(item => {
                return (
                    <li key={item.id} className="flex items-center gap-4">
                        <span>{item.title}</span>
                        <a href={item.spotify_link} target="_blank">
                            <SpotifyButton />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
