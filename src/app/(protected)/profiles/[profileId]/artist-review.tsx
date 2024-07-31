import { TArtistReview } from "@/types/review";

type ArtistReviewProps = {
  artistReview: TArtistReview;
};

export async function ArtistReview({ artistReview }: ArtistReviewProps) {
  return (
    <div>
      Name: {artistReview.artist.name}, rating: {artistReview.rating}
    </div>
  );
}
