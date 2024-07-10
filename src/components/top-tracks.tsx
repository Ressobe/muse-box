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

type TopTracksProps = {
  tracks: {
    id: string;
    title: string;
    albumId: string;
    artistId: string;
    position: number;
    album: {
      id: string;
      title: string;
      artistId: string | null;
      typeId: number;
    };
  }[];
};

export function TopTracks({ tracks }: TopTracksProps) {
  return (
    <div>
      <h2 className="font-bold text-3xl pb-6">Top tracks</h2>
      <Table className="">
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
                  <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
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
