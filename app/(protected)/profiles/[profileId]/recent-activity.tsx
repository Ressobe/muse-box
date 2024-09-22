import { getLatestReviewsForUserController } from "@/src/interface-adapters/controllers/review/get-latest-reviews-for-user.controller";
import { LatestReviews } from "./latest-reviews";

type RecentActivityProps = {
  profileId: string;
};

export async function RecentActivity({ profileId }: RecentActivityProps) {
  const latestActivity = await getLatestReviewsForUserController({
    userId: profileId,
    limit: 5,
  });

  if (!latestActivity) {
    return null;
  }

  return (
    <LatestReviews profileId={profileId} initialActivity={latestActivity} />
  );
}
