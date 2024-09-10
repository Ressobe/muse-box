import { getReviewsUseCase } from "@/src/application/use-cases/review/get-reviews.use-case";
import { Content } from "@/src/entities/models/content";

export async function getReviewsController(
  entityId: string,
  type: Content,
  page: number,
  perPage: number,
) {
  return await getReviewsUseCase(entityId, type, page, perPage);
}
