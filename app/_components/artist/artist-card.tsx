import { FaUser } from "react-icons/fa";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import Link from "next/link";

type ArtistCardProps = {
  artist: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
  };
  size?: "md" | "lg" | "xl";
};

export function ArtistCard({ artist, size = "xl" }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`}>
      <div className="max-w-[120px] md:max-w-max flex flex-col items-center transition-all p-4 hover:bg-secondary/40 rounded">
        <Avatar className="h-20 w-20 md:w-32 md:h-32 lg:w-48 lg:h-48">
          <AvatarImage
            src={artist.image ?? ""}
            alt={`${artist.name} avatar picture`}
          />
          <AvatarFallback>
            <FaUser className="h-8 w-8 md:w-12 md:h-12 lg:w-20 lg:h-20" />
          </AvatarFallback>
        </Avatar>
        <div className="pt-4 max-w-[200px] text-sm md:text-lg text-center text-balance">
          {artist.name}
        </div>
      </div>
    </Link>
  );
}
