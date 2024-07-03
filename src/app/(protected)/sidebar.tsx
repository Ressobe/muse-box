"use client";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { APP_NAME } from "@/config";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/components/icon";
import { LogOutIcon } from "lucide-react";

import { icons } from "lucide-react";
type IconName = keyof typeof icons;

const LINKS: {
  title: string;
  href: string;
  icon: IconName;
}[] = [
  {
    title: "Artists",
    href: "/artists",
    icon: "MicVocal",
  },
  {
    title: "Library",
    href: "",
    icon: "Disc3",
  },
  {
    title: "Playlists",
    href: "",
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
    <aside className="p-4 text-left flex flex-col border-r">
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
                  "flex items-center gap-x-2 py-1.5 pl-2 pr-8 text-lg rounded",
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
