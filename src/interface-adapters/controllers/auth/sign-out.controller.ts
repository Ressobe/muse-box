import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

export async function signOutController() {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  await authenticationService.signOut();
}
