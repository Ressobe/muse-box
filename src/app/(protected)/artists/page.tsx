import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getArtists } from "@/data-access/artist";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function Artists() {
  const artists = await getArtists();

  return (
    <section className="w-full space-y-10">
      <section>
        <h1 className="font-bold text-3xl">Top artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {artists.map((artist) => {
            return (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="cursor-pointer"
              >
                <ArtistCard artist={artist} />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">Popular artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {artists.map((artist) => {
            return (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="cursor-pointer"
              >
                <ArtistCard artist={artist} />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">New artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {artists.map((artist) => {
            return (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="cursor-pointer"
              >
                <ArtistCard artist={artist} />
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}

type ArtistCardProps = {
  artist: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
  };
};

function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Avatar className="h-20 w-20 mb-2">
        <AvatarImage src={artist.image ?? ""} />
        <AvatarFallback>
          <FaUser className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <span className="whitespace-normal">{artist.name}</span>
    </div>
  );
}
