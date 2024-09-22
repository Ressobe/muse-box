import { ActionFavouriteMenu } from "@/app/_components/favs/action-favourite-menu";
import { FavouriteMenu } from "@/app/_components/favs/favourite-menu";
import { FollowButton } from "@/app/_components/follow-button";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FollowersFollowingDialog } from "./followers-following-dialog";
import { UserProfileAvatar } from "@/app/_components/user/user-profile-avatar";
import { LatestReviews } from "./latest-reviews";
import { getProfileInfoController } from "@/src/interface-adapters/controllers/profile/get-profile-info.controller";
import { isUserFollowingProfileController } from "@/src/interface-adapters/controllers/user/is-user-following-profile.controller";
import { getUserFavouritesController } from "@/src/interface-adapters/controllers/user/get-user-favourites.controller";
import { getUserLikedArtistsController } from "@/src/interface-adapters/controllers/user/get-user-liked-artists.controller";
import { getUserLikedAlbumsController } from "@/src/interface-adapters/controllers/user/get-user-liked-albums.controller";
import { getUserLikedTracksController } from "@/src/interface-adapters/controllers/user/get-user-liked-tracks.controller";
import { getLatestReviewsForUserController } from "@/src/interface-adapters/controllers/review/get-latest-reviews-for-user.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

export default async function ProfilePage({
  params,
}: {
  params: {
    profileId: string;
  };
}) {
  const { profileId } = params;
  const authUserId = await getAuthUserIdController();
  if (!authUserId) {
    return null;
  }

  const profile = await getProfileInfoController({ profileId });
  const fav = await getUserFavouritesController({ userId: profileId });

  const isUserOwnsThisProfile = authUserId === profileId;
  const isUserFollowsThisProfile = await isUserFollowingProfileController({
    userId: authUserId,
    profileId,
  });

  const latestActivity = await getLatestReviewsForUserController({
    userId: profileId,
    limit: 5,
  });

  let likedArists = null;
  let likedAlbums = null;
  let likedTracks = null;
  if (isUserOwnsThisProfile) {
    likedArists = await getUserLikedArtistsController({ userId: authUserId });
    likedAlbums = await getUserLikedAlbumsController({ userId: authUserId });
    likedTracks = await getUserLikedTracksController({ userId: authUserId });
  }

  return (
    <section className="space-y-20">
      <div className="flex flex-col justify-center items-center lg:justify-start lg:flex-row  gap-x-20">
        <UserProfileAvatar
          canEdit={isUserOwnsThisProfile}
          authUserId={authUserId}
          avatarUrl={profile.user.image}
        />
        <div className="text-center md:text-left space-y-6 pb-10 lg:pb-0">
          <h1 className="font-bold text-4xl">{profile.user.name}</h1>
          {!isUserOwnsThisProfile && (
            <FollowButton
              defaultFollowState={isUserFollowsThisProfile}
              followerId={authUserId}
              followingId={profile.userId}
            />
          )}
        </div>
        <div className="pl-0 lg:pl-20 flex gap-10">
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
      <LatestReviews profileId={profileId} initialActivity={latestActivity} />
    </section>
  );
}
