"use client";

import { Button } from "@/app/_components/ui/button";
import { AddComment } from "./add-comment";
import { Comment } from "./comment";
import Link from "next/link";
import { useOptimistic, useState } from "react";
import { Entity } from "@/types";
import { OptimisticActionReview, Review } from "@/types/review";

type ReviewsProps = {
  entityId: string;
  entityName?: string;
  type: Entity;
  reviews: Review[];
  showAddReview: boolean;
  showButtonAllReviews?: boolean;
};

export function Reviews({
  entityId,
  entityName,
  type,
  reviews,
  showAddReview,
  showButtonAllReviews = true,
}: ReviewsProps) {
  const [optimisticReviews, setOptimisticReviews] = useOptimistic<
    Review[],
    OptimisticActionReview
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

  const [shouldShowAddReview, setShouldShowAddReview] = useState(showAddReview);

  const addOptimisticReview = (review: Review) => {
    setShouldShowAddReview(false);
    setOptimisticReviews({ type: "add", review });
  };

  const editOptimisticReview = (review: Review) => {
    setShouldShowAddReview(false);
    setOptimisticReviews({ type: "edit", review });
  };

  const deleteOptimisticReview = (reviewId: string) => {
    setShouldShowAddReview(true);
    setOptimisticReviews({ type: "delete", reviewId });
  };

  return (
    <div className="pt-20 w-full">
      <h2 className="font-bold text-2xl pb-4">
        User Reviews {entityName && `for ${entityName}`}
      </h2>
      {shouldShowAddReview ? (
        <AddComment
          entityId={entityId}
          type={type}
          addOptimisticReview={addOptimisticReview}
        />
      ) : null}
      <div className="pt-10 max-w-lg grid grid-cols-1 gap-12">
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
        {showButtonAllReviews && reviews.length > 0 && (
          <Link href={`/reviews?type=${type}&id=${entityId}`}>
            <Button variant="secondary">See all reviews</Button>
          </Link>
        )}
        {showButtonAllReviews && reviews.length === 0 && (
          <h3 className="font-bold text-2xl">No reviews yet</h3>
        )}
      </div>
    </div>
  );
}
