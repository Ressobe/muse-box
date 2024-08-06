import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { Notifications } from "@/components/notification/notifications";
import { SearchBar } from "@/components/search-bar";

export async function Topbar() {
  const user = await currentUser();

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <SearchBar />
      <div className="flex gap-x-10 items-center">
        <Notifications />
        <Link href={`/profiles/${user?.id}`}>
          <UserAvatar />
        </Link>
      </div>
    </header>
  );
}
