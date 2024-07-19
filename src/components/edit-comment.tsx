"use client";

import { Button } from "@/components/ui/button";
import Rating from "@/components/rating";
import { useToast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { editReviewAction } from "@/actions/reviews";
import { Entity } from "@/types";
import { Review } from "@/types/review";

type CommentProps = {
  reviewId: string;
  entityId: string;
  type: Entity;
  editOptimisticReview: (action: Review) => void;
  defaultRate: number;
  defaultComment: string;
  setEditing: Dispatch<SetStateAction<boolean>>;
};

export function EditComment({
  reviewId,
  entityId,
  type,
  editOptimisticReview,
  defaultRate,
  defaultComment,
  setEditing,
}: CommentProps) {
  const user = useCurrentUser();

  const { toast } = useToast();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState(defaultComment);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [comment]);

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "You have to log in",
      });
      return;
    }
    if (!user.id) {
      toast({
        variant: "destructive",
        title: "You have to log in",
      });
      return;
    }

    if (!user.name) {
      toast({
        variant: "destructive",
        title: "You have to log in",
      });
      return;
    }

    const comment = formData.get("comment") as string;
    const rating = Number(localStorage.getItem("starRating"));

    const reviewOptimistic = {
      id: reviewId,
      rating: rating,
      comment: comment,
      userId: user.id,
      user: {
        id: user.id,
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? null,
        emailVerified: null,
        password: null,
      },
      createdAt: new Date(),
      entityId: entityId,
    };

    editOptimisticReview(reviewOptimistic);

    const response = await editReviewAction(
      reviewId,
      entityId,
      user.id,
      comment,
      rating,
      type,
    );

    if (response.sucess) {
      toast({
        variant: "sucessful",
        title: "Review",
        description: "Your review was sucessful updated!",
      });
    }

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    }
    setEditing(false);
  };

  const resetForm = () => {
    setComment("");
    setEditing(false);
  };

  return (
    <>
      <form action={handleSubmit} className="w-full flex flex-col gap-x-6">
        <div>
          <Rating size={30} defaultRate={defaultRate} />
          <textarea
            className="w-full text-md outline-none active:outline-none border-b border-muted-foreground focus:outline-none resize-none bg-background text-foreground  focus:border-b-2 focus:border-foreground mt-4 mb-3 pb-1 pr-3 overflow-y-hidden"
            rows={1}
            id="comment"
            name="comment"
            placeholder="Type your review here."
            value={comment}
            ref={textAreaRef}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="w-full space-x-6 py-2">
          <Button
            onClick={() => resetForm()}
            type="button"
            className=""
            variant="secondary"
            size="sm"
          >
            Cancel
          </Button>
          <SubmitButton>Rate</SubmitButton>
        </div>
      </form>
    </>
  );
}
