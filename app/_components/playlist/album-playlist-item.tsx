import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { getTime, getYear, getFullAlbumTime } from "@/lib/utils";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { getAlbumInfoController } from "@/src/interface-adapters/controllers/album/get-album-info.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

type AlbumPlaylistItemProps = {
  albumId: string;
};

export async function AlbumPlaylistItem({ albumId }: AlbumPlaylistItemProps) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId) {
    return null;
  }

  const album = await getAlbumInfoController(albumId);
  if (!album) {
    return null;
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Link
          href={`/albums/${album.id}`}
          className="hover:bg-secondary/40 p-4"
        >
          <Image src={album.image ?? ""} width={200} height={200} alt="dkdk" />
        </Link>
        <div className="space-y-8">
          <div>
            <div>{album.albumType.name}</div>
            <Link href={`/albums/${album.id}`}>
              <h1 className="font-bold text-4xl transition-opacity hover:opacity-70">
                {album.title}
              </h1>
            </Link>
          </div>
          <RatingStats
            ratingAvg={album.stats?.ratingAvg}
            ratingCount={album.stats?.ratingCount}
          />
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-12 w-12">
              <AvatarImage src={album.artist.image ?? ""} />
              <AvatarFallback>
                <FaUser className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/artists/${album.artist.id}`}
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
              defaultLikeState={true}
              entityId={album.id}
              type="album"
              userId={authUserId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
