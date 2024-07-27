import { auth } from "@/auth";

interface AuthenticatedSession {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  isOAuth?: boolean;
}

export const currentUser = async (): Promise<AuthenticatedSession | null> => {
  const session = await auth();

  if (!session) {
    return null;
  }

  if (session?.user?.id) {
    // Jeśli sesja jest poprawna i zawiera id, zwracamy obiekt AuthenticatedSession
    return { id: session.user.id, ...session };
  }

  return null;
};

export const authAction = async (callback: any) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not logged in!");
  }
  callback();
};
