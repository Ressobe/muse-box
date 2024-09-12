"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { CircleCheck, Star, XIcon } from "lucide-react";
import { Entity } from "@/types";
import Rating from "./rating";
import { useEffect, useRef, useState, useTransition } from "react";
import clsx from "clsx";
import { useToast } from "@/app/_components/ui/use-toast";
import { changeReviewRateAction } from "@/app/_actions/reviews";
import { usePathname } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

type DialogRatingProps = {
  userId: string;
  entityId: string;
  entityName: string;
  type: Entity;
  defaultRate: number;
  defaultReview?: string;
};

export function DialogRating({
  userId,
  entityId,
  entityName,
  type,
  defaultRate,
  defaultReview,
}: DialogRatingProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState(defaultReview ?? "");

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [comment]);

  const closeDialog = () => setDialogOpen(false);

  const handleSubmit = async () => {
    closeDialog();
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const rating = Number(localStorage.getItem("starRating"));

      const response = await changeReviewRateAction(
        pathname,
        entityId,
        userId,
        rating,
        comment,
        type,
      );

      if (response.sucess) {
        toast({
          variant: "sucessful",
          description: (
            <div className="flex items-center">
              <CircleCheck className="mr-2 text-green-500" />
              Your rating was updated sucessful!
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
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          <Star
            className={clsx(
              "h-6 w-6 md:w-8 md:h-8",
              defaultRate !== 0 && "fill-foreground",
            )}
          />

          {isPending ? (
            <TailSpin
              visible={true}
              height="40"
              width="40"
              color="#6d28d9"
              ariaLabel="tail-spin-loading"
              radius="0.3"
              wrapperClass="absolute top-1/5 left-1/5"
            />
          ) : null}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-screen-sm overflow-y-scroll max-h-screen">
        <DialogHeader className="pt-2 pb-3">
          <DialogTitle>Rate {entityName}</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Rating size={30} defaultRate={defaultRate === 0 ? 1 : defaultRate} />
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

        <form className="w-1/3 flex flex-col gap-x-6">
          <div className="w-full flex space-x-4 py-3">
            <Button
              onClick={closeDialog}
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
      </DialogContent>
    </Dialog>
  );
}
