import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getUserArtistReviewUseCase } from "@/use-cases/user";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/app/_components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/_components/ui/avatar";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { LikeButton } from "@/app/_components/like-button";
import { DialogComment } from "@/app/_components/review/dialog-comment";
import { ArrowDownNarrowWide } from "lucide-react";

type TopArtistsTableProps = {
  artists: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
    ratingAvg: number | null;
  }[];
  userId: string;
};

export async function TopArtistsTable({
  artists: artistsInitial,
  userId,
}: TopArtistsTableProps) {
  const artists = await Promise.all(
    artistsInitial.map(async (artist) => {
      const review = await getUserArtistReviewUseCase(userId, artist.id);
      const defaultRate = review?.rating ?? 0;

      return {
        ...artist,
        defaultRate: defaultRate,
        isLiked: await isUserLikedItUseCase(userId, artist.id, "artist"),
      };
    }),
  );

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
            const stats = {
              ratingAvg: item.ratingAvg,
            };

            return (
              <TableRow key={item.id}>
                <TableCell className="font-bold text-4xl">{idx + 1}</TableCell>
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
                  <RatingStats stats={stats} size="lg" />
                </TableCell>
                <TableCell>
                  <LikeButton
                    defaultLikeState={item.isLiked}
                    entityId={item.id}
                    userId={userId}
                    type="artist"
                  />
                  <DialogComment
                    type="artist"
                    entityId={item.id}
                    userId={userId}
                    entityName={item.name}
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
          href="/artists/search"
          className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
        >
          <ArrowDownNarrowWide className="w-6 h-6" />
          See more
        </Link>
      </div>
    </>
  );
}
