import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "@/app/_components/like-button";
import { currentUser } from "@/lib/auth";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ContentInteraction } from "../content-interaction";

type TopTracksProps = {
  topTracks: {
    id: string;
    title: string;
    ratingAvg: number | null;
    album: {
      id: string;
      image: string | null;
      title: string;
    };
    isLiked: boolean | undefined;
    defaultRate: number | undefined;
  }[];
};

export async function TopTracks({ topTracks }: TopTracksProps) {
  const authUser = await currentUser();
  const userId = authUser?.id;

  return (
    <>
      {topTracks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Album</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topTracks.map((item, idx) => {
              return (
                <TableRow key={item.id} className="p-0">
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="flex items-center gap-x-4">
                    <Image
                      src={item.album.image ?? ""}
                      width={70}
                      height={70}
                      alt="dkdk"
                    />
                    <Link
                      href={`/tracks/${item.id}`}
                      className="transition-all underline-offset-2 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/albums/${item.album.id}`}
                      className="transition-all underline-offset-2 hover:underline"
                    >
                      {item.album.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <RatingStats ratingAvg={item.ratingAvg} size="sm" />
                  </TableCell>

                  <TableCell>
                    {userId ? (
                      <ContentInteraction
                        userId={userId}
                        entityName={item.title}
                        entityId={item.id}
                        type="track"
                        isLiked={item.isLiked ?? false}
                        defaultRate={item.defaultRate ?? 0}
                      />
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <span>Not rated tracks yet!</span>
      )}
    </>
  );
}
