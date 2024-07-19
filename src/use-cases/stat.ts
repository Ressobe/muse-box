import { Entity } from "@/types";

export async function updateAverageRatingUseCase(
  entityId: string,
  type: Entity,
) {
  const stats = await updateAvgRating(entityId, type);
  return stats;
}
