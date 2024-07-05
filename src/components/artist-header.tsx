import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartIcon, SquarePlus } from "lucide-react";
import { FaUser } from "react-icons/fa";

type ArtistHeaderProps = {
  name: string;
};

export function ArtistHeader({ name }: ArtistHeaderProps) {
  return (
    <div className="flex items-center gap-x-20">
      <Avatar className="h-40 w-40">
        <AvatarImage src="" />
        <AvatarFallback>
          <FaUser className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      <div className="text-left">
        <div>Artist</div>
        <h1 className="font-bold text-4xl">{name}</h1>
        <ul className="flex py-4 gap-x-6">
          <li className="border p-2 transition-all hover:bg-secondary">
            Heavy metal
          </li>
          <li className="border p-2 transition-all hover:bg-secondary">Rock</li>
          <li className="border p-2 transition-all hover:bg-secondary">
            Thrash metal
          </li>
          <li className="border p-2 transition-all hover:bg-secondary">
            Death metal
          </li>
        </ul>
      </div>
      <div className="flex gap-x-4">
        <HeartIcon className="w-10 h-10" />
        <SquarePlus className="w-10 h-10" />
      </div>
    </div>
  );
}
