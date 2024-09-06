import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { FaUser } from "react-icons/fa";

type UserAvatarProps = {
  avatarUrl?: string | null;
  size?: "small" | "large";
};

export function UserAvatar({ avatarUrl, size = "small" }: UserAvatarProps) {
  return (
    <Avatar className={clsx(size === "small" ? "h-12  w-12" : "h-24 w-24")}>
      <AvatarImage src={avatarUrl || ""} />
      <AvatarFallback>
        <FaUser className={clsx(size === "small" ? "h-8  w-8" : "h-12 w-12")} />
      </AvatarFallback>
    </Avatar>
  );
}
