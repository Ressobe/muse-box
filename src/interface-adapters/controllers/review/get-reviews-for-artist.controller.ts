import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getReviewForArtistOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-artist-owned-by-user.use-case";
import { getReviewsForArtistNotOwnedByUserUseCase } from "@/src/application/use-cases/review/get-reviews-for-artist-not-owned-by-user.use-case";

// function presenter(reviews: ReviewWithUser[]) {
//   return reviews.map((item) => ({
//     id: item.id,
//     rating: item.rating,
//     comment: item.comment,
//     createdAt: item.createdAt,
//     user: {
//       id: item.user.id,
//       name: item.user.name,
//       image: item.user.image,
//     },
//     entityId: item.entityId,
//   }));
// }

export async function getReviewsForArtistController(artistId: string) {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const session = await authenticationService.validateSession();

  const reviews = await getReviewsForArtistNotOwnedByUserUseCase(
    artistId,
    session.id,
  );

  const userReview = await getReviewForArtistOwnedByUserUseCase(
    artistId,
    session.id,
  );

  if (userReview && reviews) {
    return [userReview, ...reviews];
  }

  return reviews;
}
