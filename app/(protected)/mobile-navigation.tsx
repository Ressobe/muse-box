"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { LINKS } from "./sidebar";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import { cn } from "@/app/_lib/utils";
import { usePathname } from "next/navigation";
import { LogOutIcon, XIcon } from "lucide-react";
import { LogoutButton } from "@/app/_components/auth/logout-button";
import { APP_NAME } from "@/config";

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function closeNavigation() {
    setOpen(false);
  }

  function openNavigation() {
    setOpen(true);
  }

  return (
    <section>
      <div className="w-10 h-10">
        {!open && (
          <Button
            variant="ghost"
            onClick={openNavigation}
            className="transition-all active:scale-125"
          >
            <HamburgerMenuIcon className="w-8 h-8" />
          </Button>
        )}
      </div>
      {open && (
        <nav className="bg-background fixed inset-0 z-50 w-full flex flex-col items-center justify-center">
          <div className="absolute top-5 left-4 sm:top-7 sm:left-4 transition-all active:scale-125">
            <Link href="/">
              <h1 className="font-bold text-3xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-125 transform transition-all active:scale-110">
                {APP_NAME}
              </h1>
            </Link>
          </div>
          <Button
            variant="ghost"
            onClick={closeNavigation}
            className="absolute top-4 right-2 sm:top-6 sm:right-4 transition-all active:scale-125"
          >
            <XIcon className="w-10 h-10 " />
          </Button>
          <div className="flex flex-col gap-y-4 w-3/4">
            {LINKS.map((item) => {
              return (
                <Link
                  onClick={closeNavigation}
                  key={item.href}
                  href={item.href}
                >
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

          <div className="flex p-10">
            <LogoutButton className="space-x-1.5">
              <LogOutIcon className="w-5 h-5" />
              <span>Logout</span>
            </LogoutButton>
          </div>
        </nav>
      )}
    </section>
  );
}
