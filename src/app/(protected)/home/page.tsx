import { RatingStats } from "@/components/review/rating-stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTopAlbumsUseCase } from "@/use-cases/album";
import { getTopArtistsUseCase } from "@/use-cases/artist";
import { getTopTracksUseCase } from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function HomePage() {
  const topArtists = await getTopArtistsUseCase();
  const topAlbums = await getTopAlbumsUseCase();
  const topTracks = await getTopTracksUseCase();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-3xl mb-8">Top artists</h1>
        <TopArtistsTable artists={topArtists} />
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top albums</h1>
        <TopAlbumsTable albums={topAlbums} />
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top tracks</h1>
        <TopTracksTable tracks={topTracks} />
      </section>
    </section>
  );
}

type TopArtistsTableProps = {
  artists: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
    ratingAvg: number | null;
  }[];
};

function TopArtistsTable({ artists }: TopArtistsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Place</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Rating</TableHead>
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

type TopAlbumsTableProps = {
  albums: {
    id: string;
    title: string;
    length: number | null;
    image: string | null;
    artistId: string;
    typeId: number;
    releaseDate: Date | null;
    ratingAvg: number | null;
  }[];
};

function TopAlbumsTable({ albums }: TopAlbumsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Place</TableHead>
          <TableHead>Album</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((item, idx) => {
          const stats = {
            ratingAvg: item.ratingAvg,
          };

          return (
            <TableRow key={item.id}>
              <TableCell className="font-bold text-4xl">{idx + 1}</TableCell>
              <TableCell className="flex items-center gap-4">
                <div className="w-[100px] h-[100px]">
                  <Image
                    src={item.image ?? ""}
                    width={100}
                    height={100}
                    alt={`${item.title} cover image`}
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/albums/${item.id}`}
                  className="hover:underline underline-offset-2"
                >
                  {item.title}
                </Link>
              </TableCell>

              <TableCell>
                <RatingStats stats={stats} size="lg" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

type TopTracksTableProps = {
  tracks: {
    id: string;
    title: string;
    length: number | null;
    image: string | null;
    position: number;
    albumId: string;
    artistsCredits: string;
    ratingAvg: number | null;
    album: {
      id: string;
      image: string | null;
      artistId: string;
      typeId: number;
      title: string;
      length: number | null;
      releaseDate: Date | null;
    };
  }[];
};

function TopTracksTable({ tracks }: TopTracksTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Place</TableHead>
          <TableHead>Song</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracks.map((item, idx) => {
          const stats = {
            ratingAvg: item.ratingAvg,
          };

          return (
            <TableRow key={item.id}>
              <TableCell className="font-bold text-4xl">{idx + 1}</TableCell>
              <TableCell className="flex items-center gap-4">
                <div className="w-[100px] h-[100px]">
                  <Image
                    src={item.image ?? ""}
                    width={100}
                    height={100}
                    alt={`${item.title} cover image`}
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/tracks/${item.id}`}
                  className="hover:underline underline-offset-2"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>
                <RatingStats stats={stats} size="lg" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
