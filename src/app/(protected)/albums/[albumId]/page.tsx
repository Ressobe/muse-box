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
import { getAlbumUseCase } from "@/use-cases/album";
import { notFound } from "next/navigation";

export default async function AlbumPage({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  const { albumId } = params;
  const album = await getAlbumUseCase(albumId);
  if (!album) {
    notFound();
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>{album.albumType.name}</div>
            <h1 className="font-bold text-5xl">{album.title}</h1>
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Image
              src="/taco2.jpeg"
              width={60}
              height={60}
              alt="dkdk"
              className="rounded-full"
            />
            <Link
              href={`/artists/${album.artistId}`}
              className="underline-offset-2 hover:underline"
            >
              <span>{album.artist?.name}</span>
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
          {album.tracks.map((track) => {
            return (
              <TableRow key={track.id} className="p-0">
                <TableCell className="font-medium">{track.position}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <Image src="/taco2.jpeg" width={70} height={70} alt="dkdk" />
                  <Link
                    href={`/tracks/${track.id}`}
                    className="transition-all underline-offset-2 hover:underline"
                  >
                    {track.title}
                  </Link>
                </TableCell>
                <TableCell>10000</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
