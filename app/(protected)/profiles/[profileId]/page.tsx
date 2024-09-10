import { ActionFavouriteMenu } from "@/app/_components/favs/action-favourite-menu";
import { FavouriteMenu } from "@/app/_components/favs/favourite-menu";
import { FollowButton } from "@/app/_components/follow-button";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { currentUser } from "@/lib/auth";
import { getProfileUseCase } from "@/use-cases/profile";
import {
  getUserFavourtiesUseCase,
  getUserLikedAlbumsUseCase,
  getUserLikedArtistsUseCase,
  getUserLikedTracksUseCase,
  isUserFollowingProfileUseCase,
} from "@/use-cases/user";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { RecentActivity } from "./recent-activity";
import { FollowersFollowingDialog } from "./followers-following-dialog";
import { UserProfileAvatar } from "@/app/_components/user/user-profile-avatar";

export default async function ProfilePage({
  params,
}: {
  params: {
    profileId: string;
  };
}) {
  const { profileId } = params;
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const profile = await getProfileUseCase(profileId);
  const fav = await getUserFavourtiesUseCase(profileId);

  const isUserOwnsThisProfile = user.id === profileId;
  const isUserFollowsThisProfile = await isUserFollowingProfileUseCase(
    user.id,
    profileId,
  );

  let likedArists = null;
  let likedAlbums = null;
  let likedTracks = null;
  if (isUserOwnsThisProfile) {
    likedArists = await getUserLikedArtistsUseCase(user.id);
    likedAlbums = await getUserLikedAlbumsUseCase(user.id);
    likedTracks = await getUserLikedTracksUseCase(user.id);
  }

  return (
    <section className="space-y-20">
      <div className="flex items-center gap-x-20">
        <UserProfileAvatar
          canEdit={isUserOwnsThisProfile}
          authUserId={user.id}
          avatarUrl={profile.user.image}
        />
        <div className="text-left space-y-6">
          <h1 className="font-bold text-4xl">{profile.user.name}</h1>
          {!isUserOwnsThisProfile && (
            <FollowButton
              defaultFollowState={isUserFollowsThisProfile}
              followerId={user.id}
              followingId={profile.userId}
            />
          )}
        </div>
        <div className="pl-20 flex gap-10">
          <span className="flex flex-col items-center">
            <FollowersFollowingDialog
              profileId={profileId}
              type="followers"
              amount={profile.amountOfFollowers}
            />
          </span>
          <span className="flex flex-col items-center">
            <FollowersFollowingDialog
              profileId={profileId}
              type="following"
              amount={profile.amountOfFollowing}
            />
          </span>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
        <li className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-2xl">Favourite Artist</h2>
          {fav?.artist?.id ? (
            <div className="relative">
              <Link
                href={`/artists/${fav?.artist.id}`}
                className="flex flex-col items-center gap-y-4 p-10 border rounded-lg transition-colors"
              >
                <div className="w-[150px] h-[150px] relative overflow-hidden">
                  {fav.artist.image ? (
                    <Image
                      src={fav.artist.image ?? ""}
                      layout="fill"
                      objectFit="cover"
                      alt={`${fav.artist.name} image`}
                    />
                  ) : (
                    <Avatar className="h-36 w-36">
                      <AvatarFallback>
                        <FaUser className="w-16 h-16" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <span className="text-lg">{fav?.artist.name}</span>
              </Link>
              {isUserOwnsThisProfile && likedArists && (
                <ActionFavouriteMenu
                  type="artist"
                  likedContent={{ type: "artists", items: likedArists }}
                  className="absolute top-0 right-0"
                />
              )}
            </div>
          ) : (
            <>
              {isUserOwnsThisProfile && likedArists ? (
                <FavouriteMenu
                  likedContent={{ type: "artists", items: likedArists }}
                />
              ) : null}
            </>
          )}
        </li>
        <li className="flex flex-col items-center">
          <h2 className="font-bold text-2xl mb-4">Favourite Album</h2>
          {fav?.album?.id ? (
            <div className="relative">
              <Link
                href={`/albums/${fav.album.id}`}
                className="flex flex-col items-center gap-y-4 p-10 border rounded-lg transition-colors"
              >
                <div className="flex flex-col items-center gap-y-4">
                  <Image
                    src={fav.album.image ?? ""}
                    width={150}
                    height={150}
                    alt={`${fav.album.title} image`}
                  />
                  {fav.album.title}
                </div>
              </Link>
              {isUserOwnsThisProfile && likedAlbums && (
                <ActionFavouriteMenu
                  type="album"
                  likedContent={{ type: "albums", items: likedAlbums }}
                  className="absolute top-0 right-0"
                />
              )}
            </div>
          ) : (
            <>
              {isUserOwnsThisProfile && likedAlbums ? (
                <FavouriteMenu
                  likedContent={{ type: "albums", items: likedAlbums }}
                />
              ) : null}
            </>
          )}
        </li>

        <li className="flex flex-col items-center">
          <h2 className="font-bold text-2xl mb-4">Favourite Song</h2>
          {fav?.track?.id ? (
            <div className="relative">
              <Link
                href={`/tracks/${fav.track.id}`}
                className="flex flex-col items-center gap-y-4 p-10 border rounded-lg transition-colors"
              >
                <div className="flex flex-col items-center gap-y-4">
                  <Image
                    src={fav.track.album.image ?? ""}
                    width={150}
                    height={150}
                    alt={`${fav.track.title} image`}
                  />
                  {fav.track.title}
                </div>
              </Link>
              {isUserOwnsThisProfile && likedTracks && (
                <ActionFavouriteMenu
                  type="track"
                  likedContent={{ type: "tracks", items: likedTracks }}
                  className="absolute top-0 right-0"
                />
              )}
            </div>
          ) : (
            <>
              {isUserOwnsThisProfile && likedTracks ? (
                <FavouriteMenu
                  likedContent={{ type: "tracks", items: likedTracks }}
                />
              ) : null}
            </>
          )}
        </li>
      </ul>
      <RecentActivity profileId={profileId} />
    </section>
  );
}
