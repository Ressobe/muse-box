import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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
          <AvatarImage
            src={user.image ?? ""}
            alt={`${user.name} avatar picture`}
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
