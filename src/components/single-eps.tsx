import Image from "next/image";
import Link from "next/link";

type SingleEpsProps = {
  artistId: string;
  singleEps: {
    artistId: string | null;
    id: string;
    title: string;
    typeId: number;
  }[];
};

export function SingleEps({ artistId, singleEps }: SingleEpsProps) {
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
        {singleEps.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/albums/${item.id}`}
              className="transition-all p-4 hover:bg-secondary/40 rounded"
            >
              <li>
                <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
                <div className="pt-4">{item.title}</div>
                <div className="text-muted-foreground">2016</div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="flex justify-center w-full">
        {singleEps.length === 0 ? (
          <h3 className="font-bold text-lg">Not Single and Eps yet</h3>
        ) : null}
      </div>
    </div>
  );
}
