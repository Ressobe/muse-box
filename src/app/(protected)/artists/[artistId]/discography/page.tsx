import { LikeButton } from "@/components/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentUser } from "@/lib/auth";
import { getFullAlbumTime, getTime, getYear } from "@/lib/utils";
import { getArtistDiscographyUseCase } from "@/use-cases/artist";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function DiscographyPage({
  params,
}: {
  params: {
    artistId: string;
  };
}) {
  const { artistId } = params;
  const discography = await getArtistDiscographyUseCase(artistId);

  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <section className="space-y-32">
      {discography.map(async (album) => {
        const isLikedAlbum = await isUserLikedItUseCase(
          user.id,
          album.id,
          "album",
        );
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
                    <AvatarImage src={album.artist.image ?? ""} />
                    <AvatarFallback>
                      <FaUser className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/artists/${album.artist.id}`}
                    className="transition-all underline-offset-2 hover:underline"
                  >
                    {album.artist.name}
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
                  <LikeButton
                    defaultLikeState={isLikedAlbum}
                    entityId={album.id}
                    type="album"
                    userId={user.id}
                  />
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
                  const isLikedTrack = await isUserLikedItUseCase(
                    user.id,
                    track.id,
                    "track",
                  );

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
                        <div className="flex items-center gap-4 ">
                          <span className="text-yellow-500 text-2xl">★</span>
                          {track.stats.ratingAvg}
                        </div>
                      </TableCell>
                      <TableCell>
                        <LikeButton
                          defaultLikeState={isLikedTrack}
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
          </div>
        );
      })}
    </section>
  );
}
