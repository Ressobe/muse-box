import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { shouldShowAddReviewUseCase } from "@/src/application/use-cases/review/should-show-add-review.use-case";
import { Content } from "@/src/entities/models/content";

export async function shouldShowAddReviewController(
  entityId: string,
  type: Content,
) {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();
  if (!userId) {
    return false;
  }

  const shouldAdd = await shouldShowAddReviewUseCase(entityId, userId, type);

  return shouldAdd;
}
