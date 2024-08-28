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
import { getAlbumReviewsUseCase, getAlbumUseCase } from "@/use-cases/album";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { getTime, getYear, getFullAlbumTime } from "@/lib/utils";
import { Reviews } from "@/components/reviews";
import { currentUser } from "@/lib/auth";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { LikeButton } from "@/components/like-button";
import { shouldShowAddReviewUseCase } from "@/use-cases/review";

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

  console.log(album.tracks);

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
          {/* <div className="flex items-center gap-x-4 text-3xl"> */}
          {/*   <span className="text-yellow-500 ">★</span> */}
          {/*   {album.stats.ratingCount === 0 ? ( */}
          {/*     <span className="text-md">Not rated yet!</span> */}
          {/*   ) : ( */}
          {/*     album.stats.ratingAvg */}
          {/*   )} */}
          {/* </div> */}
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-16 w-16">
              <AvatarImage src={album.artist.image ?? ""} />
              <AvatarFallback>
                <FaUser className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/artists/${album.artistId}`}
              className="underline-offset-2 hover:underline"
            >
              <span>{album.artist?.name}</span>
            </Link>
            <span>{getYear(album.releaseDate)}</span>
            <span>
              {album.tracks.length > 1
                ? `${album.tracks.length} songs`
                : `${album.tracks.length} song`}
              , {getTime(getFullAlbumTime(album.tracks))}
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracksWithLikes.map((track) => {
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
                {/* <TableCell> */}
                {/*   <div className="flex items-center gap-4 "> */}
                {/*     <span className="text-yellow-500 text-2xl">★</span> */}
                {/*     {track.stats.ratingAvg} */}
                {/*   </div> */}
                {/* </TableCell> */}
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
