import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ImageWithBlur } from "./image-with-blur";

type UserCardProps = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
};

export function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={`/profiles/${user.id}`}
      className="flex flex-col items-center text-center cursor-pointer"
    >
      <div className="hover:bg-secondary/40 p-4 rounded transition-all">
        <Avatar className="h-48 w-48 mb-2">
          <ImageWithBlur
            src={user.image ?? ""}
            alt={`${user.name} avatar picture`}
            className="aspect-square h-full w-full"
            width={250}
            height={250}
          />
          <AvatarFallback>
            <FaUser className="w-24 h-24" />
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-normal">{user.name}</span>
      </div>
    </Link>
  );
}
