import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { getTime, getYear, getFullAlbumTime } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import { LikeButton } from "@/components/like-button";
import { getAlbumUseCase } from "@/use-cases/album";

type AlbumPlaylistItemProps = {
  albumId: string;
};

export async function AlbumPlaylistItem({ albumId }: AlbumPlaylistItemProps) {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const album = await getAlbumUseCase(albumId);
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
          <div className="flex items-center gap-x-4  text-2xl">
            <span className="text-yellow-500">★</span>
            {album.stats.ratingCount === 0 ? (
              <span className="text-md">Not rated yet!</span>
            ) : (
              album.stats.ratingAvg
            )}
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-12 w-12">
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
              defaultLikeState={true}
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
