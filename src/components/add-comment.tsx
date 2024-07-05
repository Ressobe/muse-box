"use client";

import { Button } from "@/components/ui/button";
import Rating from "@/components/rating";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { SubmitButton } from "@/components/submit-button";
// import addCommentAction from "./_actions/comment";

type CommentProps = {
  artistId: string;
  profileId?: string;
};

export function AddComment({ artistId, profileId }: CommentProps) {
  const { toast } = useToast();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState("");
  const [isTextAreaActive, setIsTextAreaActive] = useState(false);

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
    // await addCommentAction(artistId, profileId, rating, comment);
  };

  const resetForm = () => {
    setComment("");
    setIsTextAreaActive(false);
  };

  const handleFocus = () => {
    setIsTextAreaActive(true);
  };

  const handleBlur = () => {
    if (comment === "") {
      setIsTextAreaActive(false);
    }
  };

  return (
    <>
      <form action={handleSubmit} className="w-full flex gap-x-6">
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </form>
      <AnimatePresence>
        {isTextAreaActive && (
          <motion.div
            className="w-full space-x-6 py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => resetForm()}
              type="button"
              className=""
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
            <Button type="button" className="" variant="default" size="sm">
              Rate
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
