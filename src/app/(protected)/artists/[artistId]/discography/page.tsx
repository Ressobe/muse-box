import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getArtistDiscographyUseCase } from "@/use-cases/artist";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function DiscographyPage({
  params,
}: {
  params: {
    artistId: string;
  };
}) {
  const { artistId } = params;
  const discography = await getArtistDiscographyUseCase(artistId);

  return (
    <section className="space-y-12">
      {discography.map((item) => {
        return (
          <div key={item.id} className="space-y-12">
            <div className="flex items-center gap-x-16">
              <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
              <div className="space-y-8">
                <div>
                  <div>{item.albumType.name}</div>
                  <h1 className="font-bold text-5xl">{item.title}</h1>
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
                    href={`/artists/${artistId}`}
                    className="transition-all underline-offset-2 hover:underline"
                  >
                    <span>{item.artist?.name}</span>
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
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.tracks.map((item, idx) => {
                  return (
                    <TableRow key={item.id} className="p-0">
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="flex items-center gap-x-4">
                        <Image
                          src="/taco2.jpeg"
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
                      <TableCell>10000</TableCell>
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
      })}
    </section>
  );
}
