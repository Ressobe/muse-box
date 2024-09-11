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
import { useState, useTransition } from "react";
import clsx from "clsx";
import { useToast } from "@/app/_components/ui/use-toast";
import { changeReviewRateAction } from "@/app/_actions/reviews";
import { usePathname } from "next/navigation";

type DialogRatingProps = {
  userId: string;
  entityId: string;
  entityName: string;
  type: Entity;
  defaultRate: number;
};

export function DialogRating({
  userId,
  entityId,
  entityName,
  type,
  defaultRate,
}: DialogRatingProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

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
            className={clsx("w-8 h-8", defaultRate !== 0 && "fill-foreground")}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pt-2 pb-3">
          <DialogTitle>Rate {entityName}</DialogTitle>
        </DialogHeader>

        <form className="w-1/3 flex flex-col gap-x-6">
          <div>
            <Rating
              size={30}
              defaultRate={defaultRate === 0 ? 1 : defaultRate}
            />
          </div>
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
