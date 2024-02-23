import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../../lib/auth";
import SignInButton from "./sign-button";
import Menu from "./menu";
import ProfileMenu from "./profile-menu";
import Notifications from "./notifications";
import { getProfile } from "../../database/profile";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const profile = await getProfile(session?.user.userid);

  return (
    <>
      <nav className="flex w-full justify-between  px-4 pt-8 items-center gap-2">
        <Link
          href="/"
          className="hover:underline hover:font-bold flex items-center gap-x-2"
        >
          <img src="/music-box.png" className="w-10" alt="music box icon" />
          MuseBox.com
        </Link>

        <div className="flex items-center gap-x-2">
          {session ? (
            <>
              <Notifications />
              {profile ? (
                <ProfileMenu
                  username={session.user.username}
                  profileId={profile.id}
                />
              ) : null}
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
      <Menu />
      <hr />
    </>
  );
}
