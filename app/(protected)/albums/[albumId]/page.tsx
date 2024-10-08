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
import { notFound } from "next/navigation";
import { getTime, getYear, getFullAlbumTime } from "@/app/_lib/utils";
import { Reviews } from "@/app/_components/review/reviews";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ArtistSmallHeader } from "@/app/_components/artist/artist-small-header";
import { shouldShowAddReviewController } from "@/src/interface-adapters/controllers/review/should-show-add-review.controller";
import { getAlbumReviewsController } from "@/src/interface-adapters/controllers/album/get-album-reviews.controller";
import { getAlbumInfoController } from "@/src/interface-adapters/controllers/album/get-album-info.controller";
import { ContentInteraction } from "@/app/_components/content-interaction";
// import { getPopularAlbumsController } from "@/src/interface-adapters/controllers/album/get-popular-albums.controller";
// import { getTopAlbumsController } from "@/src/interface-adapters/controllers/album/get-top-albums.controller";
// import { getNewAlbumsController } from "@/src/interface-adapters/controllers/album/get-new-albums.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

// export async function generateStaticParams() {
//   const topAlbums = await getTopAlbumsController();
//   const popularAlbums = await getPopularAlbumsController();
//   const newAlbums = await getNewAlbumsController();
//
//   return [...topAlbums, ...popularAlbums, ...newAlbums].map((item) => ({
//     albumId: item.id,
//   }));
// }

export default async function AlbumPage({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  const { albumId } = params;

  const authUserId = await getAuthUserIdController();
  if (!authUserId) return null;

  const album = await getAlbumInfoController(albumId);
  if (!album) {
    return notFound();
  }

  const reviews = await getAlbumReviewsController(albumId);
  const showAddReview = await shouldShowAddReviewController(albumId, "album");

  return (
    <section className="space-y-12">
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
            <h1 className="font-bold text-2xl md:text-5xl">{album.title}</h1>
          </div>
          <RatingStats ratingAvg={album.stats?.ratingAvg} />
          <div className="flex items-center gap-x-4 text-sm">
            <ArtistSmallHeader artist={album.artist} />
            {album.isLiked !== undefined && (
              <div className="block md:hidden">
                <LikeButton
                  defaultLikeState={album.isLiked}
                  entityId={album.id}
                  type="album"
                  userId={authUserId}
                />
              </div>
            )}

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

            {album.isLiked !== undefined && (
              <LikeButton
                defaultLikeState={album.isLiked}
                entityId={album.id}
                type="album"
                userId={authUserId}
              />
            )}
          </div>
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:block"></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {album.tracks.map((track) => {
            const artistsCreditsNames = track.artistCredit.artistsCreditsNames;
            return (
              <TableRow key={track.id} className="p-0">
                <TableCell className="font-medium">{track.position}</TableCell>
                <TableCell className="flex items-center gap-x-4 min-w-[150px]">
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
                  <div className="hidden md:block">
                    {artistsCreditsNames.length > 0 ? (
                      <div>
                        {artistsCreditsNames.map((item) => {
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
                  </div>
                </TableCell>
                <TableCell>
                  <RatingStats ratingAvg={track.stats?.ratingAvg} size="sm" />
                </TableCell>
                <TableCell>
                  {track.isLiked !== undefined &&
                    track.defaultRate !== undefined &&
                    track.defaultReview !== undefined && (
                      <ContentInteraction
                        userId={authUserId}
                        entityName={track.title}
                        entityId={track.id}
                        type="track"
                        isLiked={track.isLiked}
                        defaultRate={track.defaultRate}
                        defaultReview={track.defaultReview}
                      />
                    )}
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
