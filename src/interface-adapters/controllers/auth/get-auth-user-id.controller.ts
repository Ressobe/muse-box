import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

export async function getAuthUserIdController() {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();

  return userId;
}
