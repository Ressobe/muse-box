import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import SignOutButton from "./sign-out-button";
import { Button } from "../ui/button";
import {
  Heart,
  PlayCircle,
  LifeBuoy,
  Info,
  LogOut,
  Plus,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

type ProfileMenuProps = {
  username: string;
  profileId: string;
};

export default async function ProfileMenu({
  username,
  profileId,
}: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-10 py-4 outline-none bg-background hover:bg-background hover:brightness-150 ">
          <Avatar>
            <AvatarImage src="/user.png" alt="user avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-foreground px-4 font-bold text-lg">
            {username}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-card">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href={`/profile/${profileId}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href="/account/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>Favourites</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <PlayCircle className="mr-2 h-4 w-4" />
            <span>Playlists</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <Link className="cursor-pointer" href="/account/friends">
              Friends
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Add friends</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>Invitations to friends</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Info className="mr-2 h-4 w-4" />
            <span>About us</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
