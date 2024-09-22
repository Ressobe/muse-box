import { Session } from "@/src/entities/models/session";

export interface IAuthenticationService {
  validateSession(): Promise<Session>;
  getUserId(): Promise<string | undefined>;
  signOut(): Promise<void>;

  signIn(
    provider: string,
    email: string,
    password: string,
    redirectTo: string,
  ): Promise<void>;
}
