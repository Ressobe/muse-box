import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IStatsRepository } from "@/src/application/repositories/stats.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";

export async function updateStatsForUpdateRatingUseCase(
  entityId: string,
  type: Content,
  oldRating: number,
  newRating: number,
) {
  const statsRepository = container.get<IStatsRepository>("IStatsRepository");

  const existingStat = await statsRepository.getStats(entityId, type);
  if (!existingStat) {
    throw new NotFoundError("Stats not founded when updating rating");
  }

  existingStat.ratingSum = existingStat.ratingSum ?? 0;
  existingStat.ratingCount = existingStat.ratingCount ?? 1;

  const newRatingSum = existingStat.ratingSum - oldRating + newRating;
  const newReviewCount = existingStat.ratingCount;

  let newAvgRating = 0;
  if (newReviewCount !== 0) {
    newAvgRating = newRatingSum / newReviewCount;
  }

  await statsRepository.updateStats(
    entityId,
    type,
    newRatingSum,
    newReviewCount,
    newAvgRating,
  );
}
