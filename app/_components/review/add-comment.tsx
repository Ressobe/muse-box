"use client";

import { Button } from "@/app/_components/ui/button";
import Rating from "@/app/_components/review/rating";
import { useToast } from "@/app/_components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "@/app/_hooks/use-current-user";
import { addReviewAction } from "@/app/_actions/reviews";
import { Entity } from "@/types";
import { CircleCheck, XIcon } from "lucide-react";
import { ReviewWithUser } from "@/src/entities/models/review";

type CommentProps = {
  entityId: string;
  type: Entity;
  addOptimisticReview: (action: ReviewWithUser) => void;
};

export function AddComment({
  entityId,
  type,
  addOptimisticReview,
}: CommentProps) {
  const user = useCurrentUser();

  const { toast } = useToast();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [comment]);

  const handleSubmit = async () => {
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

    const rating = Number(localStorage.getItem("starRating"));

    const reviewOptimistic = {
      id: crypto.randomUUID(),
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

    addOptimisticReview(reviewOptimistic);

    const response = await addReviewAction(
      entityId,
      user.id,
      comment,
      rating,
      type,
    );
    if (response.sucess) {
      toast({
        variant: "sucessful",
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2 text-green-500" />
            Your review was added sucessful!
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1000,
      });
    }
    if (response.error) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex items-center">
            <XIcon className="mr-2 text-red-500" />
            Something went wrong !
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1500,
      });
    }
  };

  const resetForm = () => {
    setComment("");
  };

  return (
    <form className="w-full md:w-1/3 flex flex-col gap-x-6">
      <div>
        <Rating size={30} defaultRate={1} />
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
      <div className="flex w-full gap-x-6 py-2">
        <Button
          onClick={() => resetForm()}
          type="button"
          className=""
          variant="secondary"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          size="sm"
          variant="outline"
          className="px-8"
        >
          Rate
        </Button>
      </div>
    </form>
  );
}
