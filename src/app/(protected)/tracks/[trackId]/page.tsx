import { auth } from "@/auth";
import { LikeButton } from "@/components/like-button";
import { Reviews } from "@/components/reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserTrackReview } from "@/data-access/user";
import { currentUser } from "@/lib/auth";
import { getTime, getYear } from "@/lib/utils";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getTrackReviewsUseCase, getTrackUseCase } from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default async function TrackPage({
  params,
}: {
  params: {
    trackId: string;
  };
}) {
  const { trackId } = params;
  const track = await getTrackUseCase(trackId);

  if (!track) {
    return notFound();
  }
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const reviews = await getTrackReviewsUseCase(track.id);
  const isTrackLiked = await isUserLikedItUseCase(user.id, track.id, "track");

  let showAddReview = true;
  const session = await auth();
  if (session && session.user.id) {
    const review = await getUserTrackReview(session.user.id, track.id);
    showAddReview = !review;
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image src={track.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">{track.title}</h1>
            {/* <div className="flex items-center gap-x-4 pt-3.5  text-2xl"> */}
            {/*   <span className="text-yellow-500">★</span> */}
            {/*   {track.stats.ratingCount === 0 ? ( */}
            {/*     <span className="text-md">Not rated yet!</span> */}
            {/*   ) : ( */}
            {/*     track.stats.ratingAvg */}
            {/*   )} */}
            {/* </div> */}
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            {/* <Avatar className="h-16 w-16"> */}
            {/*   <AvatarImage src={track.artist.image ?? ""} /> */}
            {/*   <AvatarFallback> */}
            {/*     <FaUser className="w-8 h-8" /> */}
            {/*   </AvatarFallback> */}
            {/* </Avatar> */}
            {/* <Link */}
            {/*   href={`/artists/${track.artist.id}`} */}
            {/*   className="transition-all underline-offset-2 hover:underline" */}
            {/* > */}
            {/*   {track.artist.name} */}
            {/* </Link> */}
            <span>{getYear(track.album.releaseDate)}</span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>
            <span>{getTime(track.length)}</span>
            <LikeButton
              defaultLikeState={isTrackLiked}
              entityId={track.id}
              type="track"
              userId={user.id}
            />
          </div>
        </div>
      </div>
      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type="track"
        entityId={trackId}
        entityName={track.title}
      />
    </section>
  );
}
