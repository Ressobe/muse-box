import { LikeButton } from "@/components/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { getArtistUseCase } from "@/use-cases/artist";
import { currentUser } from "@/lib/auth";

type ArtistPlaylistItemProps = {
  artistId: string;
};

export async function ArtistPlaylistItem({
  artistId,
}: ArtistPlaylistItemProps) {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    return null;
  }

  return (
    <section className="space-y-12">
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
            <div className="flex items-center gap-x-4 pt-3 text-4xl">
              <span className="text-yellow-500">★</span>
              {artist?.stats.ratingCount === 0 ? (
                <span className="text-xl">Not rated yet!</span>
              ) : (
                artist?.stats.ratingAvg
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-x-4">
          <LikeButton
            defaultLikeState={true}
            userId={user.id}
            entityId={artist.id}
            type="artist"
          />
        </div>
      </div>
    </section>
  );
}
