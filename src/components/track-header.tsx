import { currentUser } from "@/lib/auth";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getTrackUseCase } from "@/use-cases/track";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { getTime, getYear } from "@/lib/utils";
import { LikeButton } from "./like-button";

type TrackHeaderProps = {
  trackId: string;
};

export async function TrackHeader({ trackId }: TrackHeaderProps) {
  const track = await getTrackUseCase(trackId);
  if (!track) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const isTrackLiked = await isUserLikedItUseCase(user.id, track.id, "track");

  return (
    <section>
      <div className="flex items-center gap-x-16">
        <Image src={track.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">{track.title}</h1>
            <div className="flex items-center gap-x-4 pt-3.5  text-2xl">
              <span className="text-yellow-500">★</span>
              {track.stats.ratingCount === 0 ? (
                <span className="text-md">Not rated yet!</span>
              ) : (
                track.stats.ratingAvg
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-16 w-16">
              <AvatarImage src={track.artist.image ?? ""} />
              <AvatarFallback>
                <FaUser className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/artists/${track.artist.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.artist.name}
            </Link>
            <span>{getYear(track.album.releaseDate)}</span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>
            <span>{getTime(track.length)}</span>
            <LikeButton
              defaultLikeState={isTrackLiked}
              entityId={track.id}
              type="track"
              userId={user.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
