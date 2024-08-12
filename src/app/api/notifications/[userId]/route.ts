import { currentUser } from "@/lib/auth";
import { getUserNotificationsUseCase } from "@/use-cases/user";
import { NextResponse } from "next/server";

type Params = {
  userId: string;
};

export async function GET(_: Request, context: { params: Params }) {
  const userId = context.params.userId;
  const authUser = await currentUser();

  if (userId !== authUser?.id) {
    return NextResponse.json(
      { error: "Forbidden: You do not have access to this resource" },
      { status: 403 },
    );
  }

  const notifications = await getUserNotificationsUseCase(userId);

  return NextResponse.json(notifications);
}
