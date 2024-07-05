import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

export function TopTracks() {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="p-0">
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                Gelato
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/albums/album_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                1-800-OŚWIECENIE
              </Link>
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">2</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                Cichosza
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/albums/album_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                1-800-OŚWIECENIE
              </Link>
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">3</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                Może to coś zmieni?
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/albums/album_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                1-800-OŚWIECENIE
              </Link>
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">4</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                Pakiet Platinium
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/albums/album_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                1-800-OŚWIECENIE
              </Link>
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">5</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                Mix Sałat
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                1-800-OŚWIECENIE
              </Link>
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
