import { TAlbumReview } from "@/types/review";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToShortMonthDayYear } from "@/lib/utils";
import { Stars } from "@/components/review/stars";
import { getArtist } from "@/data-access/artist";
import Image from "next/image";
import Link from "next/link";

type AlbumReviewProps = {
  albumReview: TAlbumReview;
};

export async function AlbumReview({ albumReview }: AlbumReviewProps) {
  const artist = await getArtist(albumReview.album.artistId);
  if (!artist) {
    return null;
  }

  const [day, month, year] = formatDateToShortMonthDayYear(
    albumReview.createdAt!,
  );

  return (
    <TableRow>
      <TableCell>
        <Link href={`/albums/${albumReview.album.id}`}>
          <Image
            src={albumReview.album.image ?? ""}
            width={80}
            height={80}
            alt={`${albumReview.album.title} cover image`}
          />
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
