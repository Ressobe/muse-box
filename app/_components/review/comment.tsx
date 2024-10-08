"use client";

import { options } from "@/src/entities/types";
import Link from "next/link";
import { UserAvatar } from "@/app/_components/user/user-avatar";
import {
  CircleCheck,
  EllipsisVertical,
  Flag,
  Pencil,
  Trash,
} from "lucide-react";
import { useCurrentUser } from "@/app/_hooks/use-current-user";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { removeReviewAction } from "@/app/_actions/reviews";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { useToast } from "@/app/_components/ui/use-toast";
import { useState } from "react";
import { EditComment } from "@/app/_components/review/edit-comment";
import { ReviewWithUser } from "@/src/entities/models/review";
import { Content } from "@/src/entities/models/content";

type CommentProps = {
  review: ReviewWithUser;
  type: Content;
  entityId: string;
  editOptimisticReview: (review: ReviewWithUser) => void;
  deleteOptimisticReview: (reviewId: string) => void;
};

export function Comment({
  review,
  type,
  entityId,
  editOptimisticReview,
  deleteOptimisticReview,
}: CommentProps) {
  const [isEditing, setEditing] = useState(false);

  const editComment = () => {
    setEditing(true);
  };

  return (
    <>
      {!isEditing ? (
        <ShowComment
          review={review}
          type={type}
          editComment={editComment}
          deleteOptimisticReview={deleteOptimisticReview}
        />
      ) : (
        <EditComment
          defaultRate={review.rating}
          defaultComment={review.comment ?? ""}
          type={type}
          entityId={entityId}
          reviewId={review.id}
          setEditing={setEditing}
          editOptimisticReview={editOptimisticReview}
        />
      )}
    </>
  );
}

type ShowCommentProps = {
  review: ReviewWithUser;
  type: Content;
  editComment: () => void;
  deleteOptimisticReview: (reviewId: string) => void;
};

function ShowComment({
  review,
  type,
  editComment,
  deleteOptimisticReview,
}: ShowCommentProps) {
  const { user: reviewUser } = review;
  const currentUser = useCurrentUser();
  const isCurrentUserOwnerOfComment = currentUser?.id === reviewUser.id;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <UserAvatar avatarUrl={reviewUser.image} />
          <div className="space-y-1">
            <Link
              href={`/profiles/${review.userId}`}
              className="text-xl font-bold leading-none hover:underline"
            >
              {reviewUser.name}
            </Link>
            <p className=" space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <span>Posted on </span>
                {review.createdAt?.toLocaleDateString("en-US", options)}
              </span>
              <span>
                Rate: {review.rating}
                <span className="text-yellow-500 text-lg"> ★</span>
              </span>
            </p>
          </div>
          <ActionMenu
            editAction={isCurrentUserOwnerOfComment}
            editComment={editComment}
            commentId={review.id}
            ownerId={reviewUser.id}
            entityId={review.entityId ?? ""}
            type={type}
            deleteOptimisticReview={deleteOptimisticReview}
          />
        </div>
        <div className="border-b border-muted-foreground pb-4 border-gray-200">
          <p className="pt-4 flex items-center justify-between text-sm">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}

type ActionMenuProps = {
  editAction: boolean;
  commentId: string;
  type: Content;
  entityId: string;
  ownerId: string;
  deleteOptimisticReview: (reviewId: string) => void;
  editComment: () => void;
};

function ActionMenu({
  editAction,
  commentId,
  entityId,
  type,
  ownerId,
  deleteOptimisticReview,
  editComment,
}: ActionMenuProps) {
  const { toast } = useToast();

  const handleRemoveButtonClick = async () => {
    deleteOptimisticReview(commentId);

    await removeReviewAction(entityId, type, ownerId, commentId);

    toast({
      variant: "sucessful",
      description: (
        <div className="flex items-center">
          <CircleCheck className="mr-2 text-green-500" />
          Your review was sucessful removed!
        </div>
      ),
      className: "bg-secondary opacity-90",
      duration: 1000,
    });
  };

  const handleEditButtonClick = () => {
    editComment();
  };

  const handleReportButtonClick = async () => {
    toast({
      title: "Report",
      description: (
        <div className="flex items-center">
          <CircleCheck className="mr-2 text-green-500" />
          Your report was sended!
        </div>
      ),
      className: "bg-secondary opacity-90",
      duration: 1000,
    });
  };

  return (
    <>
      <div className="flex-1"></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="rounded-full p-2">
            <EllipsisVertical />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="absolute top-0 right-1 sm:left-1  flex flex-col gap-y-3 items-center text-center w-32">
          {editAction ? (
            <>
              <Button
                variant="ghost"
                onClick={handleEditButtonClick}
                className="p-0 w-full flex items-center justify-center gap-x-3"
              >
                <Pencil className="w-6 h-6" /> <span>Edit</span>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger className="p-0" asChild>
                  <Button
                    variant="ghost"
                    className="p-0 w-full flex items-center justify-center gap-x-3"
                  >
                    <Trash className="w-6 h-6" /> <span>Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your review.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button asChild variant="destructive">
                      <AlertDialogAction onClick={handleRemoveButtonClick}>
                        Delete
                      </AlertDialogAction>
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={handleReportButtonClick}
              className="p-0 w-full flex items-center justify-center gap-x-3"
            >
              <Flag className="w-6 h-6" /> <span>Report</span>
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
