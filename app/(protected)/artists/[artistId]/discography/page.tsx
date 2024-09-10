import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { currentUser } from "@/lib/auth";
import { getFullAlbumTime, getTime, getYear } from "@/lib/utils";
import { getArtistDiscographyController } from "@/src/interface-adapters/controllers/artist/get-artist-discography.controller";
import { getArtistInfoController } from "@/src/interface-adapters/controllers/artist/get-artist-info.controller";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaUser } from "react-icons/fa";

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

  const user = await currentUser();

  return (
    <section className="space-y-32">
      {discography.map(async (album) => {
        return (
          <div key={album.id} className="space-y-12">
            <div className="flex items-center gap-x-16">
              <Image
                src={album.image ?? ""}
                width={200}
                height={200}
                alt="dkdk"
              />
              <div className="space-y-8">
                <div>
                  <div>{album.albumType.name}</div>
                  <h1 className="font-bold text-5xl">{album.title}</h1>
                </div>
                <div className="flex items-center gap-x-4 text-sm">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={artist.image ?? ""} />
                    <AvatarFallback>
                      <FaUser className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/artists/${artist.id}`}
                    className="transition-all underline-offset-2 hover:underline"
                  >
                    {artist.name}
                  </Link>
                  <span>{getYear(album.releaseDate)}</span>
                  <Link
                    href={`/albums/${album.id}`}
                    className="transition-all underline-offset-2 hover:underline"
                  >
                    {album.title}
                  </Link>
                  <span>
                    {album.tracks.length > 1
                      ? `${album.tracks.length} songs`
                      : `${album.tracks.length} song`}
                    , {getTime(getFullAlbumTime(album.tracks))}
                  </span>
                  {album.isLiked !== undefined ? (
                    <LikeButton
                      defaultLikeState={album.isLiked}
                      entityId={album.id}
                      type="album"
                      userId={user?.id}
                    />
                  ) : null}
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
                {album.tracks.map(async (track, idx) => {
                  return (
                    <TableRow key={track.id} className="p-0">
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="flex items-center gap-x-4">
                        <Image
                          src={track.image ?? ""}
                          width={70}
                          height={70}
                          alt="dkdk"
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
                        {track.isLiked !== undefined ? (
                          <LikeButton
                            defaultLikeState={track.isLiked}
                            entityId={track.id}
                            type="track"
                            userId={user?.id}
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
    </section>
  );
}
