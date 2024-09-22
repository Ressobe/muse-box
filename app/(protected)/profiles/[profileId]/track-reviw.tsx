import { TableCell, TableRow } from "@/app/_components/ui/table";
import Image from "next/image";
import { formatDateToShortMonthDayYear } from "@/app/_lib/utils";
import { Stars } from "@/app/_components/review/stars";
import Link from "next/link";
import { ReviewWithTrackRelations } from "@/src/entities/models/review";

type TrackReviewProps = {
  trackReview: ReviewWithTrackRelations;
};

export function TrackReview({ trackReview }: TrackReviewProps) {
  const album = trackReview.track.album;

  const [day, month, year] = formatDateToShortMonthDayYear(
    trackReview.createdAt!,
  );

  return (
    <TableRow>
      <TableCell>
        <Link href={`/albums/${album?.id}`}>
          <div className="w-[100px] h-[100px] ">
            <Image
              src={album.image ?? ""}
              width={80}
              height={80}
              alt={`${album.title} cover image`}
              className="object-cover"
            />
          </div>
        </Link>
      </TableCell>
      <TableCell className="flex flex-col items-center justify-center gap-2">
        <span>{day}</span>
        <span>{month}</span>
        <span>{year}</span>
      </TableCell>
      <TableCell>
        <Stars amount={trackReview.rating} />
      </TableCell>
      <TableCell>
        <Link
          href={`/artists/${album.artistId}`}
          className="font-bold text-lg hover:underline"
        >
          {album.artist.name}
        </Link>
        <span> - </span>
        <Link
          href={`/tracks/${trackReview.track.id}`}
          className="hover:underline"
        >
          {trackReview.track.title} (
          {album.releaseDate && new Date(album.releaseDate).getFullYear()})
        </Link>
      </TableCell>
    </TableRow>
  );
}
