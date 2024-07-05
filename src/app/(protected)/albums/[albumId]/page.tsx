import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AlbumPage({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  const { albumId } = params;
  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Album</div>
            <h1 className="font-bold text-5xl">Marmur</h1>
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Image
              src="/taco2.jpeg"
              width={60}
              height={60}
              alt="dkdk"
              className="rounded-full"
            />
            <Link href={`/artists/{artistsId}`}>
              <span>Taco Hemingway</span>
            </Link>
            <span>2016</span>
            <span>17 songs, 57min 37sec</span>
          </div>
        </div>
      </div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="p-0">
            <TableCell className="font-medium">1</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              <Link
                href={`/tracks/track_id`}
                className="transition-all underline-offset-2 hover:underline"
              >
                Marmur
              </Link>
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">2</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              Witaj w hotelu Marmur
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">3</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              Żyrandol
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">4</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              Krwawa jesień
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">5</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              Grubo-chude psy
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">6</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              Portier!
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">7</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
              Mgła I (Siwe włosy)
            </TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
