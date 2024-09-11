import { currentUser } from "@/lib/auth";
import { getUserImage } from "@/data-access/user";
import { Navigation } from "./navigation";

export async function Topbar() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const image = await getUserImage(user.id);

  return (
    <header className="border-b p-3 flex justify-between items-center">
      <Navigation userId={user.id} image={image} />
    </header>
  );
}
