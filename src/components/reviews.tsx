"use client";

import { Button } from "@/components/ui/button";
import { AddComment } from "./add-comment";
import { Comment } from "./comment";
import Link from "next/link";
import { useOptimistic } from "react";
import { Entity } from "@/types";

export type Review = {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
  };
};

type ReviewsProps = {
  entityId: string;
  type: Entity;
  reviews: Review[];
  showAddReview: boolean;
};

export function Reviews({
  entityId,
  type,
  reviews,
  showAddReview,
}: ReviewsProps) {
  const [optimisticReviews, addOptimisticReview] = useOptimistic<
    Review[],
    Review
  >(reviews, (state, newReview) => [...state, newReview]);

  console.log(showAddReview);

  return (
    <div className="pt-20 w-full">
      <h2 className="font-bold text-2xl pb-4">User Reviews</h2>
      {showAddReview ? (
        <AddComment
          entityId={entityId}
          type={type}
          addOptimisticReview={addOptimisticReview}
        />
      ) : null}
      <div className="pt-10 w-full grid grid-cols-2 gap-x-10">
        {optimisticReviews.map((item) => {
          return <Comment key={item.id} review={item} />;
        })}
      </div>

      <div className="pt-10 flex justify-center">
        {reviews.length > 0 ? (
          <Link href={`/reviews/artists/${entityId}`}>
            <Button variant="secondary">See all reviews</Button>
          </Link>
        ) : (
          <h3 className="font-bold text-2xl">No reviews yet</h3>
        )}
      </div>
    </div>
  );
}
