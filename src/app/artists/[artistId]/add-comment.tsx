import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import addCommentAction from "./_actions/comment";
import { Button } from "@/src/components/ui/button";
import { StarIcon } from "lucide-react";
import Rating from "@/src/components/rating";

type CommentProps = {
  artistId: string;
  profileId?: string;
};

export default function AddComment({ artistId, profileId }: CommentProps) {
  if (!profileId) {
    return null;
  }
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  // const handleSubmit = async (formData: FormData) => {
  //   "use server";
  //   const comment = formData.get("comment") as string;
  //   await addCommentAction(artistId, profileId, 3, comment);
  // };

  const handleSubmit = async () => {
    "use server";
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
        <Rating initialRate={0} />
        <Textarea
          className="h-[120px] sm:h-[150px]"
          id="comment-2"
          placeholder="Type your comment here. Is not required"
        />
        <Button size="sm">Post Comment</Button>
      </form>
    </>
  );
}
