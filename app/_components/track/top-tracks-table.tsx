import { getUserTrackReview } from "@/data-access/user";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from "@/app/_components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { LikeButton } from "@/app/_components/like-button";
import { DialogComment } from "@/app/_components/review/dialog-comment";
import { ArrowDownNarrowWide } from "lucide-react";

type TopTracksTableProps = {
  tracks: {
    id: string;
    title: string;
    length: number | null;
    image: string | null;
    position: number;
    albumId: string;
    artistsCredits: string;
    ratingAvg: number | null;
    album: {
      id: string;
      image: string | null;
      artistId: string;
      typeId: number;
      title: string;
      length: number | null;
      releaseDate: Date | null;
    };
  }[];
  userId: string;
};

export async function TopTracksTable({
  tracks: tracksInitial,
  userId,
}: TopTracksTableProps) {
  const tracks = await Promise.all(
    tracksInitial.map(async (track) => {
      const review = await getUserTrackReview(userId, track.id);
      const defaultRate = review?.rating ?? 0;

      return {
        ...track,
        defaultRate: defaultRate,
        isLiked: await isUserLikedItUseCase(userId, track.id, "track"),
      };
    }),
  );

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
                    href={`/tracks/${item.id}`}
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
                    type="track"
                  />
                  <DialogComment
                    type="track"
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
          href="/tracks/search"
          className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
        >
          <ArrowDownNarrowWide className="w-6 h-6" />
          See more
        </Link>
      </div>
    </>
  );
}
