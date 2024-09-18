import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { removeFavouriteUseCase } from "@/src/application/use-cases/follow/remove-favourite.use-case";
import { Content } from "@/src/entities/models/content";

export async function removeFavouriteController(type: Content) {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const session = await authenticationService.validateSession();

  await removeFavouriteUseCase(session.id, type);
}
