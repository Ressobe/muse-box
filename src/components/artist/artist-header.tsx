import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArtistGenresUseCase, getArtistUseCase } from "@/use-cases/artist";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { LikeButton } from "@/components/like-button";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { currentUser } from "@/lib/auth";
import { RatingStats } from "./rating-stats";

type ArtistHeaderProps = {
  artistId: string;
};

export async function ArtistHeader({ artistId }: ArtistHeaderProps) {
  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const genres = await getArtistGenresUseCase(artistId);
  const isLiked = await isUserLikedItUseCase(user.id, artistId, "artist");

  artist.stats;

  return (
    <div className="flex items-center gap-x-20">
      <Avatar className="h-40 w-40">
        <AvatarImage src={artist?.image ?? ""} />
        <AvatarFallback>
          <FaUser className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      <div className="text-left">
        <div>Artist</div>
        <div className="relative">
          <Link href={`/artists/${artistId}`}>
            <h1 className="font-bold text-4xl">{artist?.name}</h1>
          </Link>
          <RatingStats stats={artist?.stats} />
        </div>
        <ul className="flex py-4 gap-x-6">
          {genres.map((item) => {
            return (
              <li
                key={item.genreId}
                className="border p-2 transition-all hover:bg-secondary"
              >
                {item.genre.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-x-4">
        <LikeButton
          defaultLikeState={isLiked}
          userId={user.id}
          entityId={artist.id}
          type="artist"
        />
      </div>
    </div>
  );
}
