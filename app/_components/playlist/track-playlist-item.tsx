import { TableRow, TableCell } from "@/app/_components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { getTrackInfoController } from "@/src/interface-adapters/controllers/track/get-track-info.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

type TrackPlaylistItemProps = {
  trackId: string;
  position: number;
};

export async function TrackPlaylistItem({
  trackId,
  position,
}: TrackPlaylistItemProps) {
  const userId = await getAuthUserIdController();
  if (!userId) {
    return null;
  }

  const track = await getTrackInfoController({ trackId });
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
          userId={userId}
        />
      </TableCell>
    </TableRow>
  );
}
