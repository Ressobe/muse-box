import { sendNotificationToFollowersUseCase } from "@/src/application/use-cases/notification/send-notification-to-followers.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  notificationId: z.string(),
  userId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function sendNotificationToFollowersController(
  input: ControllerInput,
) {
  const { error, data } = inputSchema.safeParse(input);

  if (error) {
    throw new InputParseError(
      "Invalid input in sendNotificationToFollowersController",
    );
  }

  await sendNotificationToFollowersUseCase(data.notificationId, data.userId);
}
