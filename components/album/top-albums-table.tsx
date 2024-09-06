import { getUserAlbumReview } from "@/data-access/user";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { RatingStats } from "@/components/review/rating-stats";
import { LikeButton } from "@/components/like-button";
import { DialogComment } from "@/components/review/dialog-comment";
import { ArrowDownNarrowWide } from "lucide-react";

type TopAlbumsTableProps = {
  albums: {
    id: string;
    title: string;
    length: number | null;
    image: string | null;
    artistId: string;
    typeId: number;
    releaseDate: Date | null;
    ratingAvg: number | null;
  }[];
  userId: string;
};

export async function TopAlbumsTable({
  albums: albumsInitial,
  userId,
}: TopAlbumsTableProps) {
  const albums = await Promise.all(
    albumsInitial.map(async (album) => {
      const review = await getUserAlbumReview(userId, album.id);
      const defaultRate = review?.rating ?? 0;

      return {
        ...album,
        defaultRate: defaultRate,
        isLiked: await isUserLikedItUseCase(userId, album.id, "album"),
      };
    }),
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Album</TableHead>
            <TableHead className="w-1/5">Rating</TableHead>
            <TableHead className="w-1/5"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((item, idx) => {
            const stats = {
              ratingAvg: item.ratingAvg,
            };

            return (
              <TableRow key={item.id}>
                <TableCell className="font-bold text-4xl">{idx + 1}</TableCell>
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
                    href={`/albums/${item.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {item.title}
                  </Link>
                </TableCell>

                <TableCell>
                  <RatingStats stats={stats} size="lg" />
                </TableCell>
                <TableCell>
                  <LikeButton
                    defaultLikeState={item.isLiked}
                    entityId={item.id}
                    userId={userId}
                    type="album"
                  />
                  <DialogComment
                    type="album"
                    entityId={item.id}
                    userId={userId}
                    entityName={item.title}
                    defaultRate={item.defaultRate}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-center">
        <Link
          href="/albums/search?sort=highestRating"
          className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
        >
          <ArrowDownNarrowWide className="w-6 h-6" />
          See more
        </Link>
      </div>
    </>
  );
}
