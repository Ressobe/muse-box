import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/app/_components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ArtistWithStats } from "@/src/entities/models/artist";
import { PaginationControls } from "@/app/_components/pagination-controls";
import { ArrowDownNarrowWide } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { ContentInteraction } from "@/app/_components/content-interaction";

type ArtistsTableProps = {
  artists: ArtistWithStats[];
  showContentInteraction: boolean;
  pagination?: {
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export async function ArtistsTable({
  artists,
  pagination,
  showContentInteraction,
}: ArtistsTableProps) {
  const authUser = await currentUser();
  const userId = authUser?.id;

  const withPaggination = pagination !== undefined;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Artist</TableHead>
            <TableHead className="w-1/5">Rating</TableHead>
            <TableHead className="w-1/5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artists.map((item, idx) => {
            let position = idx + 1;
            if (withPaggination) {
              position = (pagination.page - 1) * pagination.perPage + idx + 1;
            }
            return (
              <TableRow key={item.id}>
                <TableCell className="font-bold text-4xl">{position}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={item.image ?? ""} />
                    <AvatarFallback>
                      <FaUser className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>

                  <Link
                    href={`/artists/${item.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <RatingStats
                    ratingAvg={item.stats?.ratingAvg}
                    ratingCount={item.stats?.ratingCount}
                    size="lg"
                  />
                </TableCell>
                <TableCell>
                  {userId && showContentInteraction ? (
                    <ContentInteraction
                      userId={userId}
                      entityName={item.name}
                      entityId={item.id}
                      type="artist"
                      isLiked={item.isLiked ?? false}
                      defaultRate={item.defaultRate ?? 0}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {withPaggination && (
          <TableCaption className="mt-4 text-center">
            {pagination.totalPages > 1 ? (
              <PaginationControls
                hasPrevPage={pagination.page > 1}
                hasNextPage={pagination.page < pagination.totalPages}
                totalPages={pagination.totalPages}
                currentPage={pagination.page}
              />
            ) : null}
          </TableCaption>
        )}
      </Table>
      {!withPaggination && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/artists/search?sort=highestRating"
            className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
          >
            <ArrowDownNarrowWide className="w-6 h-6" />
            See more
          </Link>
        </div>
      )}
    </>
  );
}
