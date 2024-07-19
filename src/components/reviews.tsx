"use client";

import { Button } from "@/components/ui/button";
import { AddComment } from "./add-comment";
import { Comment } from "./comment";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import { Entity } from "@/types";
import { OptimisticAction, Review } from "@/types/review";

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
  const [optimisticReviews, setOptimisticReviews] = useOptimistic<
    Review[],
    OptimisticAction
  >(reviews, (state, action) => {
    switch (action.type) {
      case "add":
        return [action.review, ...state];
      case "edit":
        return state.map((review) =>
          review.id === action.review.id ? action.review : review,
        );
      case "delete":
        return state.filter((review) => review.id !== action.reviewId);
      default:
        return state;
    }
  });

  const [addReview, setAddReview] = useState(showAddReview);

  const addOptimisticReview = (review: Review) => {
    setAddReview(false);
    setOptimisticReviews({ type: "add", review });
  };

  const editOptimisticReview = (review: Review) =>
    setOptimisticReviews({ type: "edit", review });

  const deleteOptimisticReview = (reviewId: string) => {
    setAddReview(true);
    setOptimisticReviews({ type: "delete", reviewId });
  };

  return (
    <div className="pt-20 w-full">
      <h2 className="font-bold text-2xl pb-4">User Reviews</h2>
      {addReview ? (
        <AddComment
          entityId={entityId}
          type={type}
          addOptimisticReview={addOptimisticReview}
        />
      ) : null}
      <div className="pt-10 w-full grid grid-cols-2 gap-x-10">
        {optimisticReviews.map((item) => {
          return (
            <Comment
              key={item.id}
              entityId={entityId}
              review={item}
              type={type}
              editOptimisticReview={editOptimisticReview}
              deleteOptimisticReview={deleteOptimisticReview}
            />
          );
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
