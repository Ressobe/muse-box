import { Reviews } from "@/components/review/reviews";
import { Entity } from "@/types";
import {
  getReviewsUseCase,
  isEntityExist,
  shouldShowAddReviewUseCase,
} from "@/use-cases/review";
import { notFound } from "next/navigation";
import { PaginationControls } from "./pagination-controls";
import { ArtistHeader } from "@/components/artist/artist-header";
import { AlbumHeader } from "@/components/album/album-header";
import { TrackHeader } from "@/components/track/track-header";

type ReviewsPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 8;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
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

  const entityExist = await isEntityExist(entityId);
  if (!entityExist) {
    return notFound();
  }

  const { reviews, totalPages } = await getReviewsUseCase(
    entityId,
    type,
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
  );

  if (!reviews) {
    return notFound();
  }

  const showAddReview = await shouldShowAddReviewUseCase(entityId, type);

  return (
    <ul>
      <Header type={type} entityId={entityId} />
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

type HeaderProps = {
  type: string;
  entityId: string;
};

function Header({ type, entityId }: HeaderProps) {
  switch (type) {
    case "artist":
      return <ArtistHeader artistId={entityId} />;

    case "album":
      return <AlbumHeader albumId={entityId} />;

    case "track":
      return <TrackHeader trackId={entityId} />;
  }
}
