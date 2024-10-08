import { LikeButton } from "@/app/_components/like-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { getArtistInfoController } from "@/src/interface-adapters/controllers/artist/get-artist-info.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

type ArtistPlaylistItemProps = {
  artistId: string;
};

export async function ArtistPlaylistItem({
  artistId,
}: ArtistPlaylistItemProps) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId) {
    return null;
  }

  const { artist } = await getArtistInfoController(artistId);
  if (!artist) {
    return null;
  }

  return (
    <section className="space-y-12">
      <div className="flex flex-col sm:flex-row  items-center gap-x-20">
        <Avatar className="h-40 w-40">
          <AvatarImage src={artist.image ?? ""} />
          <AvatarFallback>
            <FaUser className="w-20 h-20" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left pt-8 sm:pt-0">
          <div>Artist</div>
          <div className="relative flex flex-col items-center gap-4 md:items-start md:flex-row">
            <Link href={`/artists/${artistId}`}>
              <h1 className="font-bold text-center sm:text-left text-4xl">
                {artist?.name}
              </h1>
            </Link>
            <RatingStats
              ratingAvg={artist.stats?.ratingAvg}
              ratingCount={artist.stats?.ratingCount}
            />
          </div>
        </div>
        <div className="flex pt-4 gap-x-4">
          <LikeButton
            defaultLikeState={true}
            userId={authUserId}
            entityId={artist.id}
            type="artist"
          />
        </div>
      </div>
    </section>
  );
}
