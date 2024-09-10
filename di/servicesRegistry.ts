import { AuthenticationService } from "@/src/infrastructure/services/authentication.service";

export const servicesRegistry = {
  IAuthenticationService: AuthenticationService,
};
