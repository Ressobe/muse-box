import { UserAvatar } from "@/app/_components/user/user-avatar";
import Link from "next/link";
import { SearchBar } from "@/app/_components/search-bar";
import { Notifications } from "@/app/_components/notification/notifications";
import { getUserImage } from "@/data-access/user";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import { getUserImage } from "@/data-access/user";
import { Navigation } from "./navigation";


export async function Topbar() {
  const userId = await getAuthUserIdController();
  if (!userId) return null;

  const image = await getUserImage(userId);

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <Navigation userId={user.id} image={image} />
    </header>
  );
}
