import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

type UserAvatarProps = {
  avatarUrl?: string | null;
};

export function UserAvatar({ avatarUrl }: UserAvatarProps) {
  return (
    <Avatar className="h-12  w-12">
      <AvatarImage src={avatarUrl || ""} />
      <AvatarFallback>
        <FaUser className="w-8 h-8" />
      </AvatarFallback>
    </Avatar>
  );
}
