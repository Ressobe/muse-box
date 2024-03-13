"use client";

import { Button } from "@/src/components/ui/button";
import Rating from "@/src/components/rating";
import { useToast } from "@/src/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { SubmitButton } from "@/src/components/submit-button";
import addCommentAction from "./_actions/comment";

type CommentProps = {
  artistId: string;
  profileId?: string;
};

export default function AddComment({ artistId, profileId }: CommentProps) {
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

  const handleSubmit = async (formData: FormData) => {
    if (!profileId) {
      toast({
        variant: "destructive",
        title: "You have to log in",
      });
      return;
    }
    const comment = formData.get("comment") as string;
    const rating = Number(localStorage.getItem("starRating"));
    await addCommentAction(artistId, profileId, rating, comment);
  };

  const resetForm = () => {
    setComment("");
  };

  return (
    <div className="relative">
      <form action={handleSubmit} className="pl-10 w-full flex gap-x-6  pt-10">
        <div className="flex items-center max-h-fit"></div>
        <div>
          <Rating size={30} defaultRate={1} />
          <textarea
            className="w-full text-md outline-none active:outline-none border-b border-muted-foreground focus:outline-none resize-none bg-background text-foreground  focus:border-b-2 focus:border-foreground mt-4 mb-3 pb-1 pr-3"
            rows={1}
            id="comment"
            name="comment"
            placeholder="Type your comment here."
            value={comment}
            ref={textAreaRef}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-row-reverse gap-x-4">
          <SubmitButton>Rate</SubmitButton>
          <Button
            onClick={() => resetForm()}
            type="button"
            className=""
            variant="secondary"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
