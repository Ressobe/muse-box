import { getUserLatestReviews } from "@/data-access/user";
import { LatestReviews } from "./latest-reviews";

type RecentActivityProps = {
  profileId: string;
};

export async function RecentActivity({ profileId }: RecentActivityProps) {
  const latestActivity = await getUserLatestReviews(profileId, 5);
  if (!latestActivity) {
    return null;
  }

  return (
    <LatestReviews profileId={profileId} initialActivity={latestActivity} />
  );
}
