"use client";

import { useState, useEffect } from "react";
import { UserAvatar } from "@/app/_components/user/user-avatar";
import Link from "next/link";
import { Notifications } from "@/app/_components/notification/notifications";
import { SearchBar } from "@/app/_components/search-bar";
import { MobileNavigation } from "./mobile-navigation";

type NavigationProps = {
  userId: string;
  image: string | null;
};

export function Navigation({ userId, image }: NavigationProps) {
  const [onlySearch, setOnlySearch] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavigationContent
      isMobile={isMobile}
      onlySearch={onlySearch}
      toggleSearch={() => setOnlySearch((prev) => !prev)}
      userId={userId}
      image={image}
    />
  );
}

type NavigationContentProps = {
  onlySearch: boolean;
  toggleSearch: () => void;
  userId: string;
  image: string | null;
  isMobile: boolean;
};

function NavigationContent({
  onlySearch,
  toggleSearch,
  userId,
  image,
  isMobile,
}: NavigationContentProps) {
  const showOtherIcons = !isMobile || !onlySearch;

  return (
    <>
      <SearchBar isOpen={onlySearch || !isMobile} toggleSearch={toggleSearch} />
      {showOtherIcons && (
        <span className="flex gap-x-6 md:gap-x-10 items-center">
          <div className="relative">
            <Notifications authUserId={userId} />
          </div>
          <Link href={`/profiles/${userId}`}>
            <UserAvatar avatarUrl={image} />
          </Link>
          <span className="block md:hidden">
            <MobileNavigation />
          </span>
        </span>
      )}
    </>
  );
}
