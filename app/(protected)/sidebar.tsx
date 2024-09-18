"use client";

import { usePathname } from "next/navigation";
import { LogoutButton } from "@/app/_components/auth/logout-button";
import { APP_NAME } from "@/config";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/app/_components/icon";
import { LogOutIcon } from "lucide-react";
import { icons } from "lucide-react";

type IconName = keyof typeof icons;

export const LINKS: {
  title: string;
  href: string;
  icon: IconName;
}[] = [
  {
    title: "Home",
    href: "/home",
    icon: "House",
  },
  {
    title: "Artists",
    href: "/artists",
    icon: "MicVocal",
  },
  {
    title: "Albums",
    href: "/albums",
    icon: "Disc3",
  },
  {
    title: "Songs",
    href: "/tracks",
    icon: "Music",
  },
  {
    title: "Playlists",
    href: "/playlists",
    icon: "ListMusic",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="p-4 hidden md:flex text-left flex-col border-r">
      <Link href="/">
        <h1 className="font-bold  hidden md:block text-3xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-125 transform transition-all active:scale-110">
          {APP_NAME}
        </h1>
      </Link>
      <div className="pt-12 flex flex-col gap-y-2">
        {LINKS.map((item) => {
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "flex items-center gap-x-2 py-1.5 pl-2 pr-8 text-md rounded hover:bg-secondary transition-all",
                  pathname === item.href ? "bg-secondary" : "",
                )}
              >
                <Icon name={item.icon} size={20} />
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
      <LogoutButton className="mt-auto space-x-1.5">
        <LogOutIcon className="w-5 h-5" />
        <span>Logout</span>
      </LogoutButton>
    </aside>
  );
}
