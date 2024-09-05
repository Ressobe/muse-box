import { LikeButton } from "@/components/like-button";
import { DialogComment } from "@/components/review/dialog-comment";
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
import { getUserAlbumReview, getUserTrackReview } from "@/data-access/user";
import { currentUser } from "@/lib/auth";
import { getTopAlbumsUseCase } from "@/use-cases/album";
import { getTopArtistsUseCase } from "@/use-cases/artist";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getTopTracksUseCase } from "@/use-cases/track";
import { getUserArtistReviewUseCase } from "@/use-cases/user";
import { ArrowDownNarrowWide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) return null;

  const topArtists = await getTopArtistsUseCase();
  const topAlbums = await getTopAlbumsUseCase();
  const topTracks = await getTopTracksUseCase();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-3xl mb-8">Top artists</h1>
        <TopArtistsTable artists={topArtists} userId={user.id} />
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top albums</h1>
        <TopAlbumsTable albums={topAlbums} userId={user.id} />
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top tracks</h1>
        <TopTracksTable tracks={topTracks} userId={user.id} />
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
  userId: string;
};

async function TopArtistsTable({
  artists: artistsInitial,
  userId,
}: TopArtistsTableProps) {
  const artists = await Promise.all(
    artistsInitial.map(async (artist) => {
      const review = await getUserArtistReviewUseCase(userId, artist.id);
      const defaultRate = review?.rating ?? 0;

      return {
        ...artist,
        defaultRate: defaultRate,
        isLiked: await isUserLikedItUseCase(userId, artist.id, "artist"),
      };
    }),
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Artist</TableHead>
            <TableHead className="w-1/5">Rating</TableHead>
            <TableHead className="w-1/5"></TableHead>
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
                <TableCell>
                  <LikeButton
                    defaultLikeState={item.isLiked}
                    entityId={item.id}
                    userId={userId}
                    type="artist"
                  />
                  <DialogComment
                    type="artist"
                    entityId={item.id}
                    userId={userId}
                    entityName={item.name}
                    defaultRate={item.defaultRate}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-center">
        <Link
          href="/artists/search"
          className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
        >
          <ArrowDownNarrowWide className="w-6 h-6" />
          See more
        </Link>
      </div>
    </>
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
  userId: string;
};

async function TopAlbumsTable({
  albums: albumsInitial,
  userId,
}: TopAlbumsTableProps) {
  const albums = await Promise.all(
    albumsInitial.map(async (album) => {
      const review = await getUserAlbumReview(userId, album.id);
      const defaultRate = review?.rating ?? 0;

      return {
        ...album,
        defaultRate: defaultRate,
        isLiked: await isUserLikedItUseCase(userId, album.id, "album"),
      };
    }),
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Album</TableHead>
            <TableHead className="w-1/5">Rating</TableHead>
            <TableHead className="w-1/5"></TableHead>
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
                <TableCell>
                  <LikeButton
                    defaultLikeState={item.isLiked}
                    entityId={item.id}
                    userId={userId}
                    type="album"
                  />
                  <DialogComment
                    type="album"
                    entityId={item.id}
                    userId={userId}
                    entityName={item.title}
                    defaultRate={item.defaultRate}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-center">
        <Link
          href="/albums/search?sort=highestRating"
          className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
        >
          <ArrowDownNarrowWide className="w-6 h-6" />
          See more
        </Link>
      </div>
    </>
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
  userId: string;
};

async function TopTracksTable({
  tracks: tracksInitial,
  userId,
}: TopTracksTableProps) {
  const tracks = await Promise.all(
    tracksInitial.map(async (track) => {
      const review = await getUserTrackReview(userId, track.id);
      const defaultRate = review?.rating ?? 0;

      return {
        ...track,
        defaultRate: defaultRate,
        isLiked: await isUserLikedItUseCase(userId, track.id, "track"),
      };
    }),
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Place</TableHead>
            <TableHead className="w-2/5">Song</TableHead>
            <TableHead className="w-1/5">Rating</TableHead>
            <TableHead className="w-1/5"></TableHead>
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
                <TableCell>
                  <LikeButton
                    defaultLikeState={item.isLiked}
                    entityId={item.id}
                    userId={userId}
                    type="track"
                  />
                  <DialogComment
                    type="track"
                    entityId={item.id}
                    userId={userId}
                    entityName={item.title}
                    defaultRate={item.defaultRate}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-8 flex justify-center">
        <Link
          href="/tracks/search"
          className="flex items-center gap-2 bg-secondary-foreground py-2 px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
        >
          <ArrowDownNarrowWide className="w-6 h-6" />
          See more
        </Link>
      </div>
    </>
  );
}
