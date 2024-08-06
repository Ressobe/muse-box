import { FaUser } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

type ArtistCardProps = {
  artist: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
  };
};

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="flex flex-col items-center text-center cursor-pointer"
    >
      <div className="hover:bg-secondary/40 p-4 rounded transition-all">
        <Avatar className="h-48 w-48 mb-2">
          <AvatarImage src={artist.image ?? ""} />
          <AvatarFallback>
            <FaUser className="w-24 h-24" />
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-normal">{artist.name}</span>
      </div>
    </Link>
  );
}
