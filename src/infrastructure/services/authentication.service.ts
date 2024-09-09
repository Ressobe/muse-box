import { auth } from "@/auth";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { Session } from "@/src/entities/models/session";

export class AuthenticationService implements IAuthenticationService {
  async validateSession(): Promise<Session> {
    const session = await auth();

    if (!session) {
      throw new AuthenticationError("Session does not exist!");
    }

    if (session?.user?.id) {
      return { id: session.user.id, ...session };
    }

    throw new AuthenticationError("Session does not exist!");
  }

  async getUserId(): Promise<string | undefined> {
    const session = await auth();
    if (session?.user?.id) {
      return session.user.id;
    }
    return undefined;
  }
}
