import { Content } from "@/src/entities/models/content";
import { LikeButton } from "@/app/_components/like-button";
import { DialogRating } from "@/app/_components/review/dialog-rating";

type ContentInteractionProps = {
  userId: string;
  type: Content;
  entityId: string;
  entityName: string;
  isLiked: boolean;
  defaultRate: number;
  defaultReview: string;
};

export function ContentInteraction({
  userId,
  type,
  entityId,
  entityName,
  isLiked,
  defaultRate,
  defaultReview,
}: ContentInteractionProps) {
  return (
    <>
      <LikeButton
        defaultLikeState={isLiked}
        entityId={entityId}
        userId={userId}
        type={type}
      />
      {defaultRate !== undefined ? (
        <DialogRating
          type={type}
          entityId={entityId}
          userId={userId}
          entityName={entityName}
          defaultRate={defaultRate}
          defaultReview={defaultReview}
        />
      ) : null}
    </>
  );
}
