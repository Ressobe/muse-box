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
import { currentUser } from "@/lib/auth";

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
  const user = await currentUser();

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
          <Link href={`/artists/${artist.id}`}>
            <h1 className="font-bold text-4xl">{artist?.name}</h1>
          </Link>
          <RatingStats ratingAvg={artist.stats?.ratingAvg} />
        </div>
        <ul className="flex py-4 gap-x-6">
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
        </ul>
      </div>
      <div className="flex gap-x-4">
        {isLiked !== undefined ? (
          <LikeButton
            defaultLikeState={isLiked}
            userId={user?.id}
            entityId={artist.id}
            type="artist"
          />
        ) : null}
      </div>
    </div>
  );
}
