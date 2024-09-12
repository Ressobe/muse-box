import { TableRow, TableCell } from "@/app/_components/ui/table";
import { getTrackUseCase } from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "@/app/_components/like-button";
import { currentUser } from "@/lib/auth";
import { RatingStats } from "@/app/_components/review/rating-stats";

type TrackPlaylistItemProps = {
  trackId: string;
  position: number;
};

export async function TrackPlaylistItem({
  trackId,
  position,
}: TrackPlaylistItemProps) {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const track = await getTrackUseCase(trackId);
  if (!track) {
    return null;
  }

  return (
    <TableRow key={track.id} className="p-0">
      <TableCell className="font-medium">{position}</TableCell>
      <TableCell className="flex items-center gap-x-4 min-w-[200px]">
        <Image
          src={track.album.image ?? ""}
          width={70}
          height={70}
          alt="dkdk"
        />
        <Link
          href={`/tracks/${track.id}`}
          className="transition-all underline-offset-2 hover:underline"
        >
          {track.title}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          href={`/albums/${track.albumId}`}
          className="transition-all underline-offset-2 hover:underline"
        >
          {track.album.title}
        </Link>
      </TableCell>
      <TableCell>
        <RatingStats
          ratingAvg={track.stats?.ratingAvg}
          ratingCount={track.stats?.ratingCount}
          size="lg"
        />
      </TableCell>
      <TableCell>
        <LikeButton
          defaultLikeState={true}
          entityId={track.id}
          type="track"
          userId={user.id}
        />
      </TableCell>
    </TableRow>
  );
}
