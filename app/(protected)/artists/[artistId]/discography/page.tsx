import { ArtistSmallHeader } from "@/app/_components/artist/artist-small-header";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { getFullAlbumTime, getTime, getYear } from "@/lib/utils";
import { getArtistDiscographyController } from "@/src/interface-adapters/controllers/artist/get-artist-discography.controller";
import { getArtistInfoController } from "@/src/interface-adapters/controllers/artist/get-artist-info.controller";
import { getNewArtistsController } from "@/src/interface-adapters/controllers/artist/get-new-artists.controller";
import { getPopularArtistsController } from "@/src/interface-adapters/controllers/artist/get-popular-artists.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const topArtists = await getTopArtistsController();
  const popularArtists = await getPopularArtistsController();
  const newArtists = await getNewArtistsController();

  return [...topArtists, ...popularArtists, ...newArtists].map((item) => ({
    artistId: item.id,
  }));
}

export default async function DiscographyPage({
  params,
}: {
  params: {
    artistId: string;
  };
}) {
  const { artistId } = params;

  const artistInfo = await getArtistInfoController(artistId);
  if (!artistInfo.artist) {
    return notFound();
  }
  const artist = artistInfo.artist;

  const discography = await getArtistDiscographyController(artistId);
  const authUserId = await getAuthUserIdController();

  return (
    <section className="space-y-32">
      <Suspense
        fallback={<h1 className="font-bold text-4xl">loading album</h1>}
      >
        {discography.map((album) => {
          return (
            <div key={album.id} className="space-y-12">
              <div className="flex flex-col items-center sm:items-start p-8 md:p-0 md:flex-row md:items-center gap-x-16">
                <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
                  <Image
                    src={album.image ?? ""}
                    width={200}
                    height={200}
                    alt={`${album.title} cover image`}
                    className="object-cover"
                  />
                </div>
                <div className="pt-8 space-y-4 md:pt-0  md:space-y-8">
                  <div>
                    <div>{album.albumType.name}</div>
                    <h1 className="font-bold text-2xl md:text-5xl">
                      {album.title}
                    </h1>
                  </div>
                  <RatingStats ratingAvg={album.stats?.ratingAvg} />
                  <div className="flex items-center gap-x-4 text-sm">
                    <ArtistSmallHeader artist={artist} />
                    <div className="block md:hidden">
                      {album.isLiked !== undefined && (
                        <LikeButton
                          defaultLikeState={album.isLiked}
                          entityId={album.id}
                          type="album"
                          userId={authUserId}
                        />
                      )}
                    </div>

                    <span className="w-2 h-2 hidden md:block bg-foreground rounded-full"></span>
                    <span className="hidden md:block">
                      {getYear(album.releaseDate)}
                    </span>

                    <span className="w-2 h-2 hidden md:block bg-foreground rounded-full"></span>
                    <span className="hidden md:block">
                      {album.tracks.length > 1
                        ? `${album.tracks.length} songs`
                        : `${album.tracks.length} song`}{" "}
                      / {getTime(getFullAlbumTime(album.tracks))}
                    </span>

                    {album.isLiked !== undefined && authUserId !== undefined ? (
                      <LikeButton
                        defaultLikeState={album.isLiked}
                        entityId={album.id}
                        type="album"
                        userId={authUserId}
                      />
                    ) : null}

                    {album.isLiked !== undefined && authUserId !== undefined ? (
                      <div className="hidden md:block">
                        <LikeButton
                          defaultLikeState={album.isLiked}
                          entityId={album.id}
                          type="album"
                          userId={authUserId}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead className="w-2/3">Title</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {album.tracks.map((track, idx) => {
                    return (
                      <TableRow key={track.id} className="p-0">
                        <TableCell className="font-medium">{idx + 1}</TableCell>
                        <TableCell className="flex items-center gap-x-4 min-w-[200px]">
                          <Image
                            src={track.image ?? ""}
                            width={70}
                            height={70}
                            alt={`${track.title} cover image`}
                          />
                          <Link
                            href={`/tracks/${track.id}`}
                            className="transition-all underline-offset-2 hover:underline"
                          >
                            {track.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <RatingStats
                            ratingAvg={track.stats?.ratingAvg}
                            size="sm"
                          />
                        </TableCell>
                        <TableCell>
                          {track.isLiked !== undefined &&
                          authUserId !== undefined ? (
                            <LikeButton
                              defaultLikeState={track.isLiked}
                              entityId={track.id}
                              type="track"
                              userId={authUserId}
                            />
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </Suspense>
    </section>
  );
}
