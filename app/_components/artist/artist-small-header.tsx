import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

type ArtistSmallHeaderProps = {
  artist: {
    image: string | null;
    id: string;
    name: string;
  };
};

export function ArtistSmallHeader({ artist }: ArtistSmallHeaderProps) {
  return (
    <div className="flex items-center gap-x-4 text-sm">
      <Avatar className="h-16 w-16">
        <AvatarImage src={artist.image ?? ""} />
        <AvatarFallback>
          <FaUser className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <Link
        href={`/artists/${artist.id}`}
        className="underline-offset-2 hover:underline"
      >
        <span>{artist.name}</span>
      </Link>
    </div>
  );
}
