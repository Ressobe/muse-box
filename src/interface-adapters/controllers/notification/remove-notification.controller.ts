import { removeNotificationUseCase } from "@/src/application/use-cases/notification/remove-notification.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  notificationId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function removeNotificationController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in removeNotificationController");
  }

  const { notificationId } = data;

  await removeNotificationUseCase(notificationId);
}
