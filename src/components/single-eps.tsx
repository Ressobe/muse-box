import Image from "next/image";
import Link from "next/link";

type SingleEpsProps = {
  artistId: string;
};

export function SingleEps({ artistId }: SingleEpsProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl pb-4">Singles and EPs</h2>
        <Link
          href={`/artists/${artistId}/discography`}
          className="text-muted-foreground hover:underline cursor-pointer"
        >
          See discography
        </Link>
      </div>
      <ul className="flex gap-x-10">
        <Link
          href={`/albums/{album_id}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li>
            <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">Marmur</div>
            <div className="text-muted-foreground">2016</div>
          </li>
        </Link>
        <Link
          href={`/albums/{album_id}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li>
            <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">Szprycer</div>
            <div className="text-muted-foreground">2016</div>
          </li>
        </Link>
        <Link
          href={`/albums/{album_id}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li>
            <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">Europa</div>
            <div className="text-muted-foreground">2016</div>
          </li>
        </Link>
        <Link
          href={`/albums/{album_id}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li>
            <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">Flagey</div>
            <div className="text-muted-foreground">2016</div>
          </li>
        </Link>
        <Link
          href={`/albums/{album_id}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li>
            <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">Wosk</div>
            <div className="text-muted-foreground">2016</div>
          </li>
        </Link>
      </ul>
    </div>
  );
}
