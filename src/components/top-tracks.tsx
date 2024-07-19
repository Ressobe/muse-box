import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getArtistTopTracksUseCase } from "@/use-cases/artist";

type TopTracksProps = {
  artistId: string;
};

export async function TopTracks({ artistId }: TopTracksProps) {
  const tracks = await getArtistTopTracksUseCase(artistId);

  return (
    <div>
      <h2 className="font-bold text-3xl pb-6">Top tracks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((item, idx) => {
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
                    href={`/albums/${item.albumId}`}
                    className="transition-all underline-offset-2 hover:underline"
                  >
                    {item.album.title}
                  </Link>
                </TableCell>
                <TableCell>1000</TableCell>
                <TableCell>
                  <Button variant="ghost" className="hover:bg-background">
                    <HeartIcon className="w-6 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
