import { Button } from "@/components/ui/button";
import { AddComment } from "./add-comment";
import { Comment } from "./comment";
import Link from "next/link";

type ReviewsProps = {
  artistId: string;
  reviews: {
    artistId: string;
    id: string;
    userId: string;
    rating: number;
    comment: string | null;
    user: {
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      password: string | null;
      image: string | null;
    };
  }[];
};

export function Reviews({ artistId, reviews }: ReviewsProps) {
  return (
    <div className="pt-20 w-full">
      <h2 className="font-bold text-2xl pb-4">User Reviews</h2>
      <AddComment artistId={artistId} />
      <div className="pt-10 w-full grid grid-cols-2 gap-x-10">
        {reviews.map((item) => {
          return (
            <Comment
              key={item.id}
              id={item.id}
              rate={item.rating}
              content={item.comment}
              ownerId={item.userId}
              createdAt={new Date()}
              ownerName={item.user.name}
            />
          );
        })}
      </div>

      <div className="pt-10 flex justify-center">
        {reviews.length > 0 ? (
          <Link href={`/reviews/artists/${artistId}`}>
            <Button variant="secondary">See all reviews</Button>
          </Link>
        ) : (
          <h3 className="font-bold text-2xl">No reviews yet</h3>
        )}
      </div>
    </div>
  );
}
