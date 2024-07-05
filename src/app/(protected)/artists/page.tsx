import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getArtists } from "@/data-access/artist";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

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
                <ArtistCard name={artist.name} />
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
                <ArtistCard name={artist.name} />
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
                <ArtistCard name={artist.name} />
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function ArtistCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Avatar className="h-20 w-20 mb-2">
        <AvatarImage src="" />
        <AvatarFallback>
          <FaUser className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <span className="whitespace-normal">{name}</span>
    </div>
  );
}