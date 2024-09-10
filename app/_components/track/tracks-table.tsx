import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/app/_components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { LikeButton } from "@/app/_components/like-button";
import { DialogComment } from "@/app/_components/review/dialog-comment";
import { ArrowDownNarrowWide } from "lucide-react";
import { PaginationControls } from "@/app/_components/pagination-controls";
import { TrackWithAlbumAndStats } from "@/src/entities/models/track";

type TracksTableProps = {
  tracks: TrackWithAlbumAndStats[];
  userId?: string;
  pagination?: {
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export function TracksTable({ tracks, userId, pagination }: TracksTableProps) {
  const withPaggination = pagination !== undefined;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Song</TableHead>
            <TableHead className="w-1/5">Rating</TableHead>
            <TableHead className="w-1/5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((item, idx) => {
            let position = idx + 1;
            if (withPaggination) {
              position = (pagination.page - 1) * pagination.perPage + idx + 1;
            }
            return (
              <TableRow key={item.id}>
                <TableCell className="font-bold text-4xl">{position}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <div className="w-[100px] h-[100px]">
                    <Image
                      src={item.image ?? ""}
                      width={100}
                      height={100}
                      alt={`${item.title} cover image`}
                      className="object-cover"
                    />
                  </div>
                  <Link
                    href={`/tracks/${item.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {item.title}
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
                  {userId ? (
                    <>
                      <LikeButton
                        defaultLikeState={item.isLiked ?? false}
                        entityId={item.id}
                        userId={userId}
                        type="artist"
                      />
                      {typeof item.defaultRate === "number" ? (
                        <DialogComment
                          type="artist"
                          entityId={item.id}
                          userId={userId}
                          entityName={item.title}
                          defaultRate={item.defaultRate}
                        />
                      ) : null}
                    </>
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
            href="/tracks/search?sort=highestRating"
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
