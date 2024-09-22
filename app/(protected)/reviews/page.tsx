import { Reviews } from "@/app/_components/review/reviews";
import { notFound } from "next/navigation";
import { PaginationControls } from "@/app/_components/pagination-controls";
import { AlbumHeader } from "@/app/_components/album/album-header";
import { TrackHeader } from "@/app/_components/track/track-header";
import { getReviewsController } from "@/src/interface-adapters/controllers/review/get-reviews.controller";
import { Content, isValidContentType } from "@/src/entities/models/content";
import { shouldShowAddReviewController } from "@/src/interface-adapters/controllers/review/should-show-add-review.controller";
import { ArtistSelect, ArtistWithStats } from "@/src/entities/models/artist";
import { Album } from "@/src/entities/models/album";
import { Track } from "@/src/entities/models/track";
import { ArtistSmallHeader } from "@/app/_components/artist/artist-small-header";

type ReviewsPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 8;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const type = searchParams["type"];
  if (!isValidContentType(type)) {
    return notFound();
  }

  const entityId = searchParams["id"];
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);

  if (!type || !entityId) {
    return notFound();
  }

  const { entity, reviews, totalPages } = await getReviewsController({
    entityId,
    type,
    page: page < 1 ? DEFAULT_PAGE : page,
    perPage: perPage < 1 ? DEFAULT_PER_PAGE : perPage,
  });

  if (!reviews) {
    return notFound();
  }

  const showAddReview = await shouldShowAddReviewController(
    entityId,
    type as Content,
  );

  // TODO: fix artist header !!!
  return (
    <ul>
      <Header type={type} entityId={entityId} entity={entity} />
      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type={type as Content}
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
  entity: ArtistSelect | Album | Track;
};

function Header({ type, entityId, entity }: HeaderProps) {
  switch (type) {
    case "artist":
      return <ArtistSmallHeader artist={entity as ArtistWithStats} />;

    case "album":
      return <AlbumHeader albumId={entityId} />;

    case "track":
      return <TrackHeader trackId={entityId} />;
  }
}
