import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

type UserAvatarProps = {
  avatarUrl?: string | null;
};

export function UserAvatar({ avatarUrl }: UserAvatarProps) {
  return (
    <Avatar className="h-28  w-28">
      <AvatarImage src={avatarUrl || ""} />
      <AvatarFallback>
        <FaUser className="w-10 h-10" />
      </AvatarFallback>
    </Avatar>
  );
}
