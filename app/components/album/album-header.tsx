import { currentUser } from "@/lib/auth";
import { getAlbumUseCase } from "@/use-cases/album";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { getFullAlbumTime, getTime, getYear } from "@/lib/utils";
import { LikeButton } from "@/components/like-button";
import Image from "next/image";
import { isUserLikedItUseCase } from "@/use-cases/playlist";

type AlbumHeaderProps = {
  albumId: string;
};

export async function AlbumHeader({ albumId }: AlbumHeaderProps) {
  const album = await getAlbumUseCase(albumId);
  if (!album) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const isAlbumLiked = await isUserLikedItUseCase(user.id, album.id, "album");

  return (
    <section>
      <div className="flex items-center gap-x-16">
        <Image
          src={album.image ?? ""}
          width={200}
          height={200}
          alt={`${album.title} cover image`}
        />
        <div className="space-y-8">
          <div>
            <div>{album.albumType.name}</div>
            <h1 className="font-bold text-5xl">{album.title}</h1>
          </div>
          <div className="flex items-center gap-x-4 text-3xl">
            <span className="text-yellow-500 ">★</span>
            {album.stats.ratingCount === 0 ? (
              <span className="text-md">Not rated yet!</span>
            ) : (
              album.stats.ratingAvg
            )}
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-16 w-16">
              <AvatarImage src={album.artist.image ?? ""} />
              <AvatarFallback>
                <FaUser className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/artists/${album.artistId}`}
              className="underline-offset-2 hover:underline"
            >
              <span>{album.artist?.name}</span>
            </Link>
            <span>{getYear(album.releaseDate)}</span>
            <span>
              {album.tracks.length > 1
                ? `${album.tracks.length} songs`
                : `${album.tracks.length} song`}
              , {getTime(getFullAlbumTime(album.tracks))}
            </span>
            <LikeButton
              defaultLikeState={isAlbumLiked}
              entityId={album.id}
              type="album"
              userId={user.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
