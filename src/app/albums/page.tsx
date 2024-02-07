import SpotifyButton from "@/src/components/SpotifyButton";
import db from "@/src/lib/db";
import Image from "next/image";

async function getAlbums() {
    return await db.album.findMany();
}

export default async function Albums() {
    const albums = await getAlbums();
    return (
        <ul className="pt-10 w-3/4 mx-auto  text-left flex flex-col items-start gap-5">
            {albums.map((item) => {
                return (
                    <li className="flex  items-center gap-3" key={item.spotify_link}>
                        <Image width="100" height="100" className="rounded-lg" src={item.img} alt={item.title} />
                        <span>{item.title}</span>
                        <a href={item.spotify_link} target="_blank">
                            <SpotifyButton />
                        </a>
                        {/* <Link 
                            href={`/artists/${encodeURIComponent(item.)}`} className="cursor-pointer hover:underline text-2xl font-bold" 
                        > 
                            {item.title} 
                        </Link> */}
                    </li>
                );
            })}
        </ul>
    );
}