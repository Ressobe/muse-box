import { Album } from "@/src/entities/models/album";
import Image from "next/image";
import Link from "next/link";

type AlbumsProps = {
  artistId: string;
  albums: Album[];
};

export function Albums({ artistId, albums }: AlbumsProps) {
  return (
    <div>
      <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row  justify-between">
        <h2 className="font-bold text-2xl pb-4">Albums</h2>
        <Link
          href={`/artists/${artistId}/discography`}
          className="text-muted-foreground hover:underline cursor-pointer"
        >
          See discography
        </Link>
      </div>
      <ul className="flex justify-center md:justify-start flex-wrap gap-x-10">
        {albums.map((alb) => {
          return (
            <Link
              key={alb.id}
              href={`/albums/${alb.id}`}
              className="transition-all p-4 hover:bg-secondary/40 rounded"
            >
              <li className="flex flex-col items-center md:items-start w-[120px]  md:max-w-[150px] md:w-fit">
                <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
                  <Image
                    src={alb.image ?? ""}
                    width={200}
                    height={200}
                    alt={`${alb.title} cover image`}
                    className="object-cover"
                  />
                </div>
                <div className="pt-4 text-center md:text-left">{alb.title}</div>
                <div className="text-muted-foreground text-center md:text-left">
                  {alb.releaseDate && new Date(alb.releaseDate).getFullYear()}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="flex justify-center w-full">
        {albums.length === 0 ? (
          <h3 className="font-bold text-lg">Not albums yet</h3>
        ) : null}
      </div>
    </div>
  );
}
