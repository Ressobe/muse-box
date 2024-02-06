import { getAlb, getSongs } from "@/src/app/utils/api";


export default async function Album({params} : {params: {name: string, album: string}}) {
    const alb = await getAlb(params.name, params.album);
    const songs = await getSongs(params.name, params.album);
    songs.sort((item1, item2) =>  item1.track_number - item2.track_number);
    return (
        <ul className="flex flex-col gap-4 items-center">
            {songs.map((item) => {
                return (
                    <li>{item.track_number} {item.title}</li>
                );
            })}
        </ul>
    );
}