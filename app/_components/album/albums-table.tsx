import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/app/_components/ui/table";
import Link from "next/link";
import { RatingStats } from "@/app/_components/review/rating-stats";
import Image from "next/image";
import { AlbumWithStats } from "@/src/entities/models/album";
import { PaginationControls } from "@/app/_components/pagination-controls";
import { ArrowDownNarrowWide } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { ContentInteraction } from "@/app/_components/content-interaction";
import clsx from "clsx";

type AlbumsTableProps = {
  albums: AlbumWithStats[];
  userId?: string;
  showContentInteraction: boolean;
  pagination?: {
    page: number;
    perPage: number;
    totalPages: number;
  };
};

export async function AlbumsTable({
  albums,
  pagination,
  showContentInteraction,
}: AlbumsTableProps) {
  const authUser = await currentUser();
  const userId = authUser?.id;

  const withPaggination = pagination !== undefined;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Album</TableHead>
            <TableHead
              className={clsx(showContentInteraction ? "w-1/5" : "w-2/5")}
            >
              Rating
            </TableHead>
            {showContentInteraction && (
              <TableHead className="w-1/5"></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((item, idx) => {
            let position = idx + 1;
            if (withPaggination) {
              position = (pagination.page - 1) * pagination.perPage + idx + 1;
            }
            return (
              <TableRow key={item.id}>
                <TableCell className="font-bold text-xl md:text-4xl">
                  {position}
                </TableCell>
                <TableCell className="flex items-center gap-4 min-w-[200px]">
                  <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
                    <Image
                      src={item.image ?? ""}
                      width={100}
                      height={100}
                      alt={`${item.title} cover image`}
                      className="object-cover"
                    />
                  </div>
                  <Link
                    href={`/albums/${item.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {item.title}
                  </Link>
                </TableCell>

                <TableCell>
                  <RatingStats
                    ratingAvg={item.stats?.ratingAvg}
                    ratingCount={item.stats?.ratingCount}
                    size="sm"
                  />
                </TableCell>
                <TableCell>
                  {userId && showContentInteraction ? (
                    <div className="flex">
                      <ContentInteraction
                        userId={userId}
                        entityName={item.title}
                        entityId={item.id}
                        type="album"
                        isLiked={item.isLiked ?? false}
                        defaultRate={item.defaultRate ?? 0}
                      />
                    </div>
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
            href="/albums/search?sort=highestRating"
            className="flex items-center gap-2 bg-secondary-foreground text-sm md:text-lg py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
          >
            <ArrowDownNarrowWide className="w-4 h-4 md:w-6 md:h-6" />
            See more
          </Link>
        </div>
      )}
    </>
  );
}
