import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tracks } from "@/database/schema";
import { getProfileUseCase } from "@/use-cases/profile";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function ProfilePage({
  params,
}: {
  params: {
    profileId: string;
  };
}) {
  const { profileId } = params;
  const profile = await getProfileUseCase(profileId);

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-20">
        <Avatar className="h-40 w-40">
          <AvatarImage src="" />
          <AvatarFallback>
            <FaUser className="w-20 h-20" />
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <h1 className="font-bold text-4xl">{profile.user.name}</h1>
          <ul className="flex py-4 gap-x-6"></ul>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {profile.favoriteArtistId ? (
          <Link
            href={`/artists/${profile.favoriteArtistId}`}
            className="flex flex-col items-center gap-y-4"
          >
            <h2 className="font-bold text-2xl">Favourite Artist</h2>
            <Avatar className="h-36 w-36">
              <AvatarImage src="" />
              <AvatarFallback>
                <FaUser className="w-20 h-20" />
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <div>
            <h2 className="font-bold text-2xl">Favourite Artist</h2>
            <p>Not selected fav artist yet</p>
          </div>
        )}
        {profile.favoriteAlbumId ? (
          <Link
            href={`/albums/${profile.favoriteAlbumId}`}
            className="flex flex-col items-center"
          >
            <h2 className="font-bold text-2xl">Favourite Album</h2>
            <div className="flex flex-col items-center gap-y-4">
              <Image src="/taco2.jpeg" width={150} height={150} alt="dkdk" />
              Marmur
            </div>
          </Link>
        ) : (
          <div>
            <h2 className="font-bold text-2xl">Favourite Album</h2>
            <p>Not selected fav album yet</p>
          </div>
        )}

        {profile.favoriteTrackId ? (
          <Link
            href={`/tracks/{trackId}`}
            className="flex flex-col items-center"
          >
            <h2 className="font-bold text-2xl">Favourite Song</h2>
            <div className="flex flex-col items-center gap-y-4">
              <Image src="/taco2.jpeg" width={150} height={150} alt="dkdk" />
              Mgła I (Siwe włosy)
            </div>
          </Link>
        ) : (
          <div>
            <h2 className="font-bold text-2xl">Favourite Song</h2>
            <p>Not selected fav song yet</p>
          </div>
        )}
      </div>
      <div>
        <h2 className="font-bold text-2xl">Recent activity</h2>
      </div>
    </section>
  );
}
