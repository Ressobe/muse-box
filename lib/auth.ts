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
