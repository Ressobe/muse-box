import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";
import { FaUser } from "react-icons/fa";
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
import { HeartIcon, SquarePlus } from "lucide-react";
import { Comment } from "@/components/comment";
import { Button } from "@/components/ui/button";
import AddComment from "@/components/add-comment";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;
  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    notFound();
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-20">
        <Avatar className="h-40 w-40">
          <AvatarImage src="" />
          <AvatarFallback>
            <FaUser className="w-20 h-20" />
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <div>Artist</div>
          <h1 className="font-bold text-4xl">{artist.name}</h1>
          <ul className="flex py-4 gap-x-6">
            <li className="border p-2 transition-all hover:bg-secondary">
              Heavy metal
            </li>
            <li className="border p-2 transition-all hover:bg-secondary">
              Rock
            </li>
            <li className="border p-2 transition-all hover:bg-secondary">
              Thrash metal
            </li>
            <li className="border p-2 transition-all hover:bg-secondary">
              Death metal
            </li>
          </ul>
        </div>
        <div className="flex gap-x-4">
          <HeartIcon className="w-10 h-10" />
          <SquarePlus className="w-10 h-10" />
        </div>
      </div>
      <TopTracks />
      <Albums />
      <SingleEps />
      <Reviews />
    </section>
  );
}

function TopTracks() {
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
              Gelato
            </TableCell>
            <TableCell>1-800-OŚWIECENIE</TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">2</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              Cichosza
            </TableCell>
            <TableCell>1-800-OŚWIECENIE</TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">3</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              Może to coś zmieni?
            </TableCell>
            <TableCell>1-800-OŚWIECENIE</TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">4</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              Pakiet Platinium
            </TableCell>
            <TableCell>1-800-OŚWIECENIE</TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
          <TableRow className="p-0">
            <TableCell className="font-medium">5</TableCell>
            <TableCell className="flex items-center gap-x-4">
              <Image src="/taco1.jpeg" width={70} height={70} alt="dkdk" />
              Mix Sałat
            </TableCell>
            <TableCell>1-800-OŚWIECENIE</TableCell>
            <TableCell>10000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function Albums() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl pb-4">Albums</h2>
        <Link
          href="/albums/album_id"
          className="text-muted-foreground hover:underline cursor-pointer"
        >
          See discography
        </Link>
      </div>
      <ul className="flex gap-x-10">
        <li>
          <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Marmur</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Szprycer</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Europa</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Flagey</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Wosk</div>
          <div className="text-muted-foreground">2016</div>
        </li>
      </ul>
    </div>
  );
}

function SingleEps() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl pb-4">Singles and EPs</h2>
        <Link
          href="/albums/album_id"
          className="text-muted-foreground hover:underline cursor-pointer"
        >
          See discography
        </Link>
      </div>
      <ul className="flex gap-x-10">
        <li>
          <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Marmur</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Szprycer</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Europa</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Flagey</div>
          <div className="text-muted-foreground">2016</div>
        </li>
        <li>
          <Image src="/taco3.jpeg" width={200} height={200} alt="dkdk" />
          <div className="pt-4">Wosk</div>
          <div className="text-muted-foreground">2016</div>
        </li>
      </ul>
    </div>
  );
}

function Reviews() {
  return (
    <div className="pt-20">
      <h2 className="font-bold text-2xl pb-4">User Reviews</h2>
      <AddComment artistId="dkdkdk" />
      <div className="pt-10 w-full grid grid-cols-2 gap-x-10">
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
      </div>
      <div className="pt-10 flex justify-center">
        <Button variant="secondary">See all reviews</Button>
      </div>
    </div>
  );
}
