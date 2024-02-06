import Link from "next/link";
import { redirect } from "next/navigation";
import { getArtist, getAlbums } from "../../utils/api";


export default async function Artist({params} : {params: {name: string}}) {
    const artist = await getArtist(decodeURIComponent(params.name));
    if (!artist) {
        redirect('/');
    }

    const albums = await getAlbums(artist.id);
    return (
        <div className="w-full mt-10 flex justify-center gap-32">
            <div>
                <h1 className="text-4xl font-bold pb-2">{artist.name}</h1>
                <img className="w-60 h-60 rounded-full border " src={artist.img} />
            </div>
            <ul> 
                {albums.map( (item) => {
                    return (
                        <li key={item.id} className="py-2 flex items-center gap-4">
                            <img className="w-20" src={item.img} />
                            <Link href={`/artists/${params.name}/${encodeURIComponent(item.title)}`} className="hover:underline" >{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
            <div>
                <div>Komentarze</div>
                <form className="flex flex-col gap-4">
                    <textarea className="border"></textarea>
                    <button className="border p-2 " type="submit">Dodaj komentarz</button>
                </form>
            </div>
        </div>
    );
}