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
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ContentInteraction } from "@/app/_components/content-interaction";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

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
    defaultReview: string | undefined;
  }[];
};

export async function TopTracks({ topTracks }: TopTracksProps) {
  const userId = await getAuthUserIdController();

  return (
    <>
      {topTracks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead className="w-3/5 md:w-2/5">Title</TableHead>
              <TableHead className="hidden md:block">Album</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topTracks.map((item, idx) => {
              return (
                <TableRow key={item.id} className="p-0 mr-4">
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="flex items-center gap-x-4 min-w-[150px]">
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
                    <div className="hidden md:block">
                      <Link
                        href={`/albums/${item.album.id}`}
                        className="transition-all underline-offset-2 hover:underline"
                      >
                        {item.album.title}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RatingStats ratingAvg={item.ratingAvg} size="sm" />
                  </TableCell>

                  <TableCell>
                    {userId ? (
                      <div className="flex">
                        <ContentInteraction
                          userId={userId}
                          entityName={item.title}
                          entityId={item.id}
                          type="track"
                          isLiked={item.isLiked ?? false}
                          defaultRate={item.defaultRate ?? 0}
                          defaultReview={item.defaultReview ?? ""}
                        />
                      </div>
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
