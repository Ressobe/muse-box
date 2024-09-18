import { UserAvatar } from "@/app/_components/user/user-avatar";
import Link from "next/link";
import { SearchBar } from "@/app/_components/search-bar";
import { Notifications } from "@/app/_components/notification/notifications";
import { getUserImage } from "@/data-access/user";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

export async function Topbar() {
  const userId = await getAuthUserIdController();
  if (!userId) return null;

  const image = await getUserImage(userId);

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <SearchBar />
      <div className="flex gap-x-10 items-center">
        <Notifications authUserId={userId} />
        <Link href={`/profiles/${userId}`}>
          <UserAvatar avatarUrl={image} />
        </Link>
      </div>
    </header>
  );
}
