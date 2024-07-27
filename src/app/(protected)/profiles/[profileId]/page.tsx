import { ActionFavouriteMenu } from "@/components/favs/action-favourite-menu";
import { FavouriteMenu } from "@/components/favs/favourite-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/auth";
import { getProfileUseCase } from "@/use-cases/profile";
import {
  getUserFavourtiesUseCase,
  getUserLikedAlbumsUseCase,
  getUserLikedArtistsUseCase,
  getUserLikedTracksUseCase,
} from "@/use-cases/user";
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
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const profile = await getProfileUseCase(profileId);
  const fav = await getUserFavourtiesUseCase(profileId);

  const isUserOwnsThisProfile = user.id === profileId;

  let likedArists = null;
  let likedAlbums = null;
  let likedTracks = null;
  if (isUserOwnsThisProfile) {
    likedArists = await getUserLikedArtistsUseCase(user.id);
    likedAlbums = await getUserLikedAlbumsUseCase(user.id);
    likedTracks = await getUserLikedTracksUseCase(user.id);
  }

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
      <ul className="grid grid-cols-3">
        <li className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-2xl">Favourite Artist</h2>
          {fav?.artist?.id ? (
            <div className="relative">
              <Link
                href={`/artists/${fav?.artist.id}`}
                className="flex flex-col items-center gap-y-4 p-10 border rounded-lg transition-colors"
              >
                <div className="w-[150px] h-[150px] relative overflow-hidden">
                  <Image
                    src={fav.artist.image ?? ""}
                    layout="fill"
                    objectFit="cover"
                    alt={`${fav.artist.name} image`}
                  />
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
    </section>
  );
}
