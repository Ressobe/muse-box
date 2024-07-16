import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartIcon, SquarePlus } from "lucide-react";
import { FaUser } from "react-icons/fa";

type ArtistHeaderProps = {
  artist: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
  };
  genres: {
    artistId: string;
    genreId: number;
    genre: {
      id: number;
      name: string;
    };
  }[];
};

export function ArtistHeader({ artist, genres }: ArtistHeaderProps) {
  return (
    <div className="flex items-center gap-x-20">
      <Avatar className="h-40 w-40">
        <AvatarImage src={artist.image ?? ""} />
        <AvatarFallback>
          <FaUser className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      <div className="text-left">
        <div>Artist</div>
        <h1 className="font-bold text-4xl">{artist.name}</h1>
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
        <HeartIcon className="w-10 h-10" />
        <SquarePlus className="w-10 h-10" />
      </div>
    </div>
  );
}
