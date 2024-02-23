import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getProfile } from "../database/profile";

export default async function getServerProfileSession() {
  const session = await getServerSession(authOptions);
  return await getProfile(session?.user.userid);
}
