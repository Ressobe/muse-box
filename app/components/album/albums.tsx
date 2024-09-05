import { getArtistAlbumsUseCase } from "@/use-cases/artist";
import Image from "next/image";
import Link from "next/link";

type AlbumsProps = {
  artistId: string;
};

export async function Albums({ artistId }: AlbumsProps) {
  const albums = await getArtistAlbumsUseCase(artistId);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl pb-4">Albums</h2>
        <Link
          href={`/artists/${artistId}/discography`}
          className="text-muted-foreground hover:underline cursor-pointer"
        >
          See discography
        </Link>
      </div>
      <ul className="flex flex-wrap gap-x-10">
        {albums.map((alb) => {
          return (
            <Link
              key={alb.id}
              href={`/albums/${alb.id}`}
              className="transition-all p-4 hover:bg-secondary/40 rounded"
            >
              <li className="max-w-[150px]">
                <div className="w-[150px] h-[150px]">
                  <Image
                    src={alb.image ?? ""}
                    width={200}
                    height={200}
                    alt={`${alb.title} cover image`}
                    className="object-cover"
                  />
                </div>
                <div className="pt-4">{alb.title}</div>
                <div className="text-muted-foreground">
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
