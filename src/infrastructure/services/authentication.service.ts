import { auth, signIn, signOut } from "@/auth";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { Session } from "@/src/entities/models/session";
import { AuthError } from "next-auth";

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

  async signIn(
    provider: string,
    email: string,
    password: string,
    redirectTo: string,
  ): Promise<void> {
    try {
      await signIn(provider, {
        email,
        password,
        redirectTo,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            throw new AuthenticationError("Invalid credentials!");
          default:
            throw new AuthenticationError("Invalid credentials!");
        }
      }
      throw error;
    }
  }

  async signOut() {
    await signOut();
  }
}
