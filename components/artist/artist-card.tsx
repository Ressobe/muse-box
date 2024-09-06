import { FaUser } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import clsx from "clsx";

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
    <Link
      href={`/artists/${artist.id}`}
      className="flex flex-col items-center text-center cursor-pointer"
    >
      <div className="hover:bg-secondary/40 p-4 rounded transition-all">
        <Avatar
          className={clsx(
            "mb-2",
            size === "xl" && "h-48 w-48 ",
            size === "lg" && "h-32 w-32",
            size === "md" && "h-20 w-20",
          )}
        >
          <AvatarImage src={artist.image ?? ""} />
          <AvatarFallback>
            <FaUser
              className={clsx(
                size === "xl" && "h-20 w-20 ",
                size === "lg" && "h-12 w-12",
                size === "md" && "h-8 w-8",
              )}
            />
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-normal">{artist.name}</span>
      </div>
    </Link>
  );
}
