import { container } from "@/di/container";
import { IStatsRepository } from "@/src/application/repositories/stats.repository.interface";
import { Content } from "@/src/entities/models/content";

export async function updateStatsForNewRatingUseCase(
  entityId: string,
  type: Content,
  newRating: number,
) {
  const statsRepository = container.get<IStatsRepository>("IStatsRepository");

  let existingStat = await statsRepository.getStats(entityId, type);
  if (!existingStat) {
    switch (type) {
      case "artist": {
        existingStat = await statsRepository.insertArtistStat(entityId);
        break;
      }
      case "album": {
        existingStat = await statsRepository.insertAlbumStat(entityId);
        break;
      }
      case "track": {
        existingStat = await statsRepository.insertTrackStat(entityId);
        break;
      }
    }
  }

  existingStat.ratingSum = existingStat.ratingSum ?? 0;
  existingStat.ratingCount = existingStat.ratingCount ?? 0;

  const newRatingSum = existingStat.ratingSum + newRating;
  const newReviewCount = existingStat.ratingCount + 1;

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
