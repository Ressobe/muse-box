import Image from "next/image";
import Link from "next/link";

export default function PlaylistsPage() {
  return (
    <section className="space-y-12">
      <h1 className="font-bold text-4xl">Your playlists</h1>

      <ul className="grid">
        <Link
          href={`/playlists/{playlistId}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li className="flex gap-x-4 items-center">
            <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">
              <div className="text-lg">Taco Best Songs</div>
              <div className="text-sm text-muted-foreground">20 Tracks</div>
              <div className="text-sm text-muted-foreground">1h 05m</div>
            </div>
          </li>
        </Link>
        <Link
          href={`/playlists/{playlistId}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li className="flex gap-x-4 items-center">
            <Image src="/taco1.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">
              <div className="text-lg">Taco Best Songs 2</div>
              <div className="text-sm text-muted-foreground">20 Tracks</div>
              <div className="text-sm text-muted-foreground">1h 05m</div>
            </div>
          </li>
        </Link>
        <Link
          href={`/playlists/{playlistId}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li className="flex gap-x-4 items-center">
            <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">
              <div className="text-lg">Taco Best Songs 3</div>
              <div className="text-sm text-muted-foreground">20 Tracks</div>
              <div className="text-sm text-muted-foreground">1h 05m</div>
            </div>
          </li>
        </Link>
        <Link
          href={`/playlists/{playlistId}`}
          className="transition-all p-4 hover:bg-secondary/40 rounded"
        >
          <li className="flex gap-x-4 items-center">
            <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
            <div className="pt-4">
              <div className="text-lg">Taco Best Songs 4</div>
              <div className="text-sm text-muted-foreground">20 Tracks</div>
              <div className="text-sm text-muted-foreground">1h 05m</div>
            </div>
          </li>
        </Link>
      </ul>
    </section>
  );
}
