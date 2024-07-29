import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { Notifications } from "@/components/notification/notifications";

export async function Topbar() {
  const user = await currentUser();

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search music..."
          className="pl-10 text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
      <div className="flex gap-x-10 items-center">
        <Notifications />
        <Link href={`/profiles/${user?.id}`}>
          <UserAvatar />
        </Link>
      </div>
    </header>
  );
}
