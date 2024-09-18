import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import { Navigation } from "./navigation";
import { getUserImage } from "@/data-access/user";

export async function Topbar() {
  const userId = await getAuthUserIdController();
  if (!userId) return null;

  const image = await getUserImage(userId);

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <Navigation userId={userId} image={image} />
    </header>
  );
}
