import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { selectFavouriteUseCase } from "@/src/application/use-cases/follow/select-favourite.use-case";
import { Content } from "@/src/entities/models/content";

export async function selectFavouriteController(
  entityId: string,
  type: Content,
) {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const session = await authenticationService.validateSession();

  await selectFavouriteUseCase(session.id, entityId, type);
}
