import { TAlbumReview } from "@/types/review";

type AlbumReviewProps = {
  albumReview: TAlbumReview;
};

export function AlbumReview({ albumReview }: AlbumReviewProps) {
  return (
    <div>
      {albumReview.album.title}, rating: {albumReview.rating}
    </div>
  );
}
