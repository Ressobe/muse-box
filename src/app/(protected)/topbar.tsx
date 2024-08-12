import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { SearchBar } from "@/components/search-bar";
import { Notifications } from "@/components/notification/notifications";

export async function Topbar() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <SearchBar />
      <div className="flex gap-x-10 items-center">
        <Notifications authUserId={user.id} />
        <Link href={`/profiles/${user?.id}`}>
          <UserAvatar />
        </Link>
      </div>
    </header>
  );
}
