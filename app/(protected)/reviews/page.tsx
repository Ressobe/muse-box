import { Reviews } from "@/app/_components/review/reviews";
import { Entity } from "@/types";
import { notFound } from "next/navigation";
import { PaginationControls } from "@/app/_components/pagination-controls";
import { ArtistHeader } from "@/app/_components/artist/artist-header";
import { AlbumHeader } from "@/app/_components/album/album-header";
import { TrackHeader } from "@/app/_components/track/track-header";
import { getReviewsController } from "@/src/interface-adapters/controllers/review/get-reviews.controller";
import { Content } from "@/src/entities/models/content";
import { shouldShowAddReviewController } from "@/src/interface-adapters/controllers/review/should-show-add-review.controller";

type ReviewsPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 8;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  // TODO: add type guard for content type
  const type = searchParams["type"];
  const entityId = searchParams["id"];
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);

  if (!type || !entityId) {
    return notFound();
  }

  if (!["artist", "album", "track"].includes(type)) {
    return notFound();
  }

  // TODO: do checks in controller and throw error
  // that i catch in ui and display 404
  // const entityExist = await isEntityExist(entityId);
  // if (!entityExist) {
  //   return notFound();
  // }

  const { reviews, totalPages } = await getReviewsController(
    entityId,
    type as Content,
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
  );

  if (!reviews) {
    return notFound();
  }

  const showAddReview = await shouldShowAddReviewController(
    entityId,
    type as Content,
  );

  // TODO: fix artist header
  return (
    <ul>
      {/* <Header type={type} entityId={entityId} /> */}
      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type={type as Entity}
        entityId={entityId}
        showButtonAllReviews={false}
      />
      {totalPages > 1 && (
        <PaginationControls
          hasPrevPage={page > 1}
          hasNextPage={page < totalPages}
          totalPages={totalPages}
          currentPage={page}
        />
      )}
    </ul>
  );
}
//
// type HeaderProps = {
//   type: string;
//   entityId: string;
// };
//
// function Header({ type, entityId }: HeaderProps) {
//   switch (type) {
//     case "artist":
//       return <ArtistHeader artistId={entityId} />;
//
//     case "album":
//       return <AlbumHeader albumId={entityId} />;
//
//     case "track":
//       return <TrackHeader trackId={entityId} />;
//   }
// }
