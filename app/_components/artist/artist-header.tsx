import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ArtistWithStats } from "@/src/entities/models/artist";
import { Genre } from "@/src/entities/models/genre";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

type ArtistHeaderProps = {
  artist: ArtistWithStats;
  genres: Genre[];
  isLiked: boolean | undefined;
};

export async function ArtistHeader({
  artist,
  genres,
  isLiked,
}: ArtistHeaderProps) {
  const userId = await getAuthUserIdController();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-x-20">
      <Avatar className="h-40 w-40">
        <AvatarImage src={artist?.image ?? ""} />
        <AvatarFallback>
          <FaUser className="w-20 h-20" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center sm:items-start text-left">
        <div className="pt-4">Artist</div>
        <div className="relative  flex flex-col gap-4 items-center sm:items-start">
          <Link href={`/artists/${artist.id}`}>
            <h1 className="font-bold text-4xl text-center">{artist?.name}</h1>
          </Link>
          <RatingStats ratingAvg={artist.stats?.ratingAvg} />
        </div>
        <ul className="flex flex-col sm:flex-row flex-wrap py-4 gap-2 md:gap-6">
          {genres.map((item) => {
            return (
              <li
                key={item.id}
                className="border p-2 transition-all hover:bg-secondary"
              >
                {item.name}
              </li>
            );
          })}
          <div className="hidden sm:flex justify-center gap-x-4">
            {isLiked !== undefined ? (
              <LikeButton
                defaultLikeState={isLiked}
                userId={userId}
                entityId={artist.id}
                type="artist"
              />
            ) : null}
          </div>
        </ul>
        <div className="flex sm:hidden justify-center gap-x-4">
          {isLiked !== undefined ? (
            <LikeButton
              defaultLikeState={isLiked}
              userId={userId}
              entityId={artist.id}
              type="artist"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
