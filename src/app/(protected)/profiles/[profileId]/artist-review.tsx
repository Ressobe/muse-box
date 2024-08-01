import { Stars } from "@/components/stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToShortMonthDayYear } from "@/lib/utils";
import { TArtistReview } from "@/types/review";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

type ArtistReviewProps = {
  artistReview: TArtistReview;
};

export async function ArtistReview({ artistReview }: ArtistReviewProps) {
  const [day, month, year] = formatDateToShortMonthDayYear(
    artistReview.createdAt!,
  );

  return (
    <TableRow>
      <TableCell>
        <Link href={`/artists/${artistReview.artist.id}`}>
          <Avatar className="h-20 w-20">
            <AvatarImage src={artistReview.artist.image ?? ""} />
            <AvatarFallback>
              <FaUser className="w-16 h-16" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </TableCell>
      <TableCell className="flex flex-col items-center justify-center gap-2 ">
        <span>{day}</span>
        <span>{month}</span>
        <span>{year}</span>
      </TableCell>
      <TableCell>
        <Stars amount={artistReview.rating} />
      </TableCell>
      <TableCell>
        <Link
          href={`/artists/${artistReview.artist.id}`}
          className="font-bold text-lg hover:underline"
        >
          {artistReview.artist.name}
        </Link>
      </TableCell>
    </TableRow>
  );
}
