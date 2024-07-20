import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArtistGenresUseCase, getArtistUseCase } from "@/use-cases/artist";
import { HeartIcon, SquarePlus } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Button } from "./ui/button";

type ArtistHeaderProps = {
  artistId: string;
};

export async function ArtistHeader({ artistId }: ArtistHeaderProps) {
  const artist = await getArtistUseCase(artistId);
  // const stats = await getArtistStatsUseCase(artistId);
  const genres = await getArtistGenresUseCase(artistId);

  return (
    <div className="flex items-center gap-x-20">
      <Avatar className="h-40 w-40">
        <AvatarImage src={artist?.image ?? ""} />
        <AvatarFallback>
          <FaUser className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      <div className="text-left">
        <div>Artist</div>
        <div className="relative">
          <Link href={`/artists/${artistId}`}>
            <h1 className="font-bold text-4xl">{artist?.name}</h1>
          </Link>
          <div className="flex items-center gap-x-4 pt-3 text-4xl">
            <span className="text-yellow-500">★</span>
            {artist?.stats.ratingCount === 0 ? (
              <span className="text-xl">Not rated yet!</span>
            ) : (
              artist?.stats.ratingAvg
            )}
          </div>
        </div>
        <ul className="flex py-4 gap-x-6">
          {genres.map((item) => {
            return (
              <li
                key={item.genreId}
                className="border p-2 transition-all hover:bg-secondary"
              >
                {item.genre.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-x-4">
        <Button variant="ghost" className="p-4">
          <HeartIcon className="w-8 h-8" />
        </Button>
        <Button variant="ghost" className="p-4">
          <SquarePlus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
