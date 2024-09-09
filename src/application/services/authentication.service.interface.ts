import { Session } from "@/src/entities/models/session";

export interface IAuthenticationService {
  validateSession(): Promise<Session>;
  getUserId(): Promise<string | undefined>;
}
