import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";

export class AuthenticationService implements IAuthenticationService {
  validateSession(): Promise<string> {
    return new Promise((resolve, rejects) => resolve("dldl"));
  }
}
