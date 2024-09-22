import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import { getNotificationsForUserController } from "@/src/interface-adapters/controllers/notification/get-notifications-for-user.controller";
import { NextResponse } from "next/server";

type Params = {
  userId: string;
};

export async function GET(_: Request, context: { params: Params }) {
  const userId = context.params.userId;
  const authUserId = await getAuthUserIdController();

  if (userId !== authUserId) {
    return NextResponse.json(
      { error: "Forbidden: You do not have access to this resource" },
      { status: 403 },
    );
  }

  const notifications = await getNotificationsForUserController({ userId });

  return NextResponse.json(notifications);
}
