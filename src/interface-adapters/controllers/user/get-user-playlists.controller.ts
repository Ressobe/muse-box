import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getUserPlaylistsUseCase } from "@/src/application/use-cases/user/get-user-playlists.use-case";

export async function getUserPlaylistsController() {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const session = await authenticationService.validateSession();

  const playlists = await getUserPlaylistsUseCase(session.id);

  return playlists;
}
