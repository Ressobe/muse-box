import Image from "next/image";
import Link from "next/link";

type AlbumsProps = {
  artistId: string;
  albums: {
    id: string;
    title: string;
  }[];
};

export function Albums({ artistId, albums }: AlbumsProps) {
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
      <ul className="flex gap-x-10">
        {albums.map((alb) => {
          return (
            <Link
              key={alb.id}
              href={`/albums/${alb.id}`}
              className="transition-all p-4 hover:bg-secondary/40 rounded"
            >
              <li>
                <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
                <div className="pt-4">{alb.title}</div>
                <div className="text-muted-foreground">2016</div>
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
