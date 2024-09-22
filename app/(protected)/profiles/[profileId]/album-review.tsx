import { TableCell, TableRow } from "@/app/_components/ui/table";
import { formatDateToShortMonthDayYear } from "@/app/_lib/utils";
import { Stars } from "@/app/_components/review/stars";
import Image from "next/image";
import Link from "next/link";
import { ReviewWithAlbumRelations } from "@/src/entities/models/review";

type AlbumReviewProps = {
  albumReview: ReviewWithAlbumRelations;
};

export function AlbumReview({ albumReview }: AlbumReviewProps) {
  const artist = albumReview.album.artist;
  const [day, month, year] = formatDateToShortMonthDayYear(
    albumReview.createdAt!,
  );

  return (
    <TableRow>
      <TableCell>
        <Link href={`/albums/${albumReview.album.id}`}>
          <div className="w-[100px] h-[100px] ">
            <Image
              src={albumReview.album.image ?? ""}
              width={80}
              height={80}
              alt={`${albumReview.album.title} cover image`}
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
        <Stars amount={albumReview.rating} />
      </TableCell>
      <TableCell>
        <Link
          href={`/artists/${artist.id}`}
          className="font-bold text-lg hover:underline"
        >
          {artist.name}
        </Link>
        <span> - </span>
        <Link
          href={`/albums/${albumReview.album.id}`}
          className="hover:underline"
        >
          {albumReview.album.title} (
          {albumReview.album.releaseDate &&
            new Date(albumReview.album.releaseDate).getFullYear()}
          )
        </Link>
      </TableCell>
    </TableRow>
  );
}
