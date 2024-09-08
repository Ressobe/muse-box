import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { getAlbumReviewsUseCase, getAlbumUseCase } from "@/use-cases/album";
import { notFound } from "next/navigation";
import { getTime, getYear, getFullAlbumTime } from "@/lib/utils";
import { Reviews } from "@/app/_components/review/reviews";
import { currentUser } from "@/lib/auth";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { LikeButton } from "@/app/_components/like-button";
import { shouldShowAddReviewUseCase } from "@/use-cases/review";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ArtistSmallHeader } from "@/app/_components/artist/artist-small-header";

export default async function AlbumPage({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  const { albumId } = params;

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const album = await getAlbumUseCase(albumId);
  if (!album) {
    return notFound();
  }

  const tracksWithLikes = await Promise.all(
    album.tracks.map(async (track) => ({
      ...track,
      isLiked: await isUserLikedItUseCase(user.id, track.id, "track"),
    })),
  );

  const isAlbumLiked = await isUserLikedItUseCase(user.id, album.id, "album");
  const reviews = await getAlbumReviewsUseCase(album.id);
  const showAddReview = await shouldShowAddReviewUseCase(album.id, "album");

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image
          src={album.image ?? ""}
          width={200}
          height={200}
          alt={`${album.title} cover image`}
        />
        <div className="space-y-8">
          <div>
            <div>{album.albumType.name}</div>
            <h1 className="font-bold text-5xl">{album.title}</h1>
          </div>
          <RatingStats stats={album?.stats} />
          <div className="flex items-center gap-x-4 text-sm">
            <ArtistSmallHeader artist={album.artist} />

            <span className="w-2 h-2 bg-foreground rounded-full"></span>

            <span>{getYear(album.releaseDate)}</span>

            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            <span>
              {album.tracks.length > 1
                ? `${album.tracks.length} songs`
                : `${album.tracks.length} song`}{" "}
              / {getTime(getFullAlbumTime(album.tracks))}
            </span>
            <LikeButton
              defaultLikeState={isAlbumLiked}
              entityId={album.id}
              type="album"
              userId={user.id}
            />
          </div>
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracksWithLikes.map((track) => {
            const artistsCreditsNames = track.artistCredit.artistsCreditsNames;
            return (
              <TableRow key={track.id} className="p-0">
                <TableCell className="font-medium">{track.position}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <Image
                    src={album.image ?? ""}
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
                  {artistsCreditsNames.length > 0 ? (
                    <div>
                      {artistsCreditsNames.map((item, idx) => {
                        return (
                          <span key={item.artistId}>
                            <Link
                              href={`/artists/${item.artistId}`}
                              className="hover:underline underline-offset-1"
                            >
                              {item.name}
                            </Link>
                            {item.joinPhrase}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell>
                  <RatingStats stats={track?.stats} size="sm" />
                </TableCell>
                <TableCell>
                  <LikeButton
                    defaultLikeState={track.isLiked}
                    entityId={track.id}
                    type="track"
                    userId={user.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type="album"
        entityId={albumId}
        entityName={album.title}
      />
    </section>
  );
}
