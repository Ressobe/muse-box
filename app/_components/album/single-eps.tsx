import { Album } from "@/src/entities/models/album";
import Image from "next/image";
import Link from "next/link";

type SinglesEpsProps = {
  artistId: string;
  singlesEps: Album[];
};

export async function SinglesEps({ artistId, singlesEps }: SinglesEpsProps) {
  return (
    <div>
      <div className="flex flex-col pb-4 sm:pb-0 sm:flex-row justify-between">
        <h2 className="font-bold text-2xl pb-4">Singles and EPs</h2>
        <Link
          href={`/artists/${artistId}/discography`}
          className="text-muted-foreground hover:underline cursor-pointer"
        >
          See discography
        </Link>
      </div>
      <ul className="flex justify-center md:justify-start flex-wrap gap-x-10">
        {singlesEps.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/albums/${item.id}`}
              className="transition-all p-4 hover:bg-secondary/40 rounded"
            >
              <li className="flex flex-col items-center md:items-start w-[120px]  md:max-w-[150px] md:w-fit">
                <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
                  <Image
                    src={item.image ?? ""}
                    width={200}
                    height={200}
                    alt={`${item.title} cover image`}
                    className="object-cover"
                  />
                </div>
                <div className="pt-4 text-center md:text-left">
                  {item.title}
                </div>
                <div className="text-muted-foreground text-center md:text-left">
                  {item.releaseDate && new Date(item.releaseDate).getFullYear()}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="flex justify-center w-full">
        {singlesEps.length === 0 ? (
          <h3 className="font-bold text-lg">Not Single and Eps yet</h3>
        ) : null}
      </div>
    </div>
  );
}
