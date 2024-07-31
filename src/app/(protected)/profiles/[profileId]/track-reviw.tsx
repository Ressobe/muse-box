import { TTrackReview } from "@/types/review";

type TrackReviewProps = {
  trackReview: TTrackReview;
};

export function TrackReview({ trackReview }: TrackReviewProps) {
  return (
    <div>
      {trackReview.track.title}, rating: {trackReview.rating}
    </div>
  );
}
