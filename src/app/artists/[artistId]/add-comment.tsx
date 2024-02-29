"use client";

import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import Rating from "@/src/components/rating";
import addCommentAction from "./_actions/comment";
import { useToast } from "@/src/components/ui/use-toast";

type CommentProps = {
  artistId: string;
  profileId?: string;
};

export default function AddComment({ artistId, profileId }: CommentProps) {
  const { toast } = useToast();

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

  return (
    <>
      <form
        action={handleSubmit}
        className="w-full flex flex-col max-w-lg space-y-2 pt-10"
      >
        <Label htmlFor="comment-2">
          <span className="text-xl font-bold">Rate</span>
          <span className="pl-4 text-muted-foreground text-sm">(required)</span>
        </Label>
        <Rating size={30} defaultRate={1} />
        <Textarea
          className="h-[120px] sm:h-[150px]"
          id="comment-2"
          name="comment"
          placeholder="Type your comment here. Is not required"
        />
        <Button type="submit" size="sm">
          Post Comment
        </Button>
      </form>
    </>
  );
}
