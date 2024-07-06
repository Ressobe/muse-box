import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { auth } from "@/auth";
import Link from "next/link";

export async function Topbar() {
  const session = await auth();

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
        <Bell className="w-8 h-8" />
        <Link href={`/profiles/${session?.user.id}`}>
          <UserAvatar />
        </Link>
      </div>
    </header>
  );
}
