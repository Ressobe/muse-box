import { createServerActionProcedure } from "zsa";
import { currentUser } from "./auth";
import { redirect } from "next/navigation";

export const authenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    const user = await currentUser();
    if (!user) {
      redirect("/auth/login");
    }

    return { user };
  },
);
