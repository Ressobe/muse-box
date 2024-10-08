"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { useCurrentUser } from "@/app/_hooks/use-current-user";
import { LogoutButton } from "./logout-button";

export function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-background">
            <FaUser className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem className="flex gap-x-2 cursor-pointer">
            <ExitIcon className="w-5 h-5" /> Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
