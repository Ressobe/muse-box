import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { createReviewUseCase } from "@/src/application/use-cases/review/create-review.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { contentSchema } from "@/src/entities/models/content";
import { notificationTypes } from "@/src/entities/models/notification";
import { z } from "zod";
import { sendNotificationToFollowersController } from "@/src/interface-adapters/controllers/notification/send-notification-to-followers.controller";
import { createNotificationUseCase } from "@/src/application/use-cases/notification/create-notification.use-case";
import { updateStatsForNewRatingUseCase } from "@/src/application/use-cases/stats/update-stats-for-new-rating.use-case";

const inputSchema = z.object({
  entityId: z.string(),
  comment: z.string(),
  rating: z.number(),
  type: contentSchema,
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function createReviewController(input: ControllerInput) {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );
  const session = await authenticationService.validateSession();

  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    console.log(data);
    throw new InputParseError("Invalid input in create review controller");
  }

  const { entityId, comment, rating, type } = data;

  const review = await createReviewUseCase(
    entityId,
    session.id,
    comment,
    rating,
    type,
  );

  await updateStatsForNewRatingUseCase(entityId, type, review.rating);

  let notiType = null;

  switch (type) {
    case "artist": {
      notiType = "artist_review";
      break;
    }
    case "album": {
      notiType = "album_review";
      break;
    }
    case "track": {
      notiType = "track_review";
      break;
    }
  }

  const { error: errorNotification, data: notificationType } =
    notificationTypes.safeParse(notiType);

  if (errorNotification) {
    throw new InputParseError("Invalid type");
  }

  if (notiType) {
    const notification = await createNotificationUseCase(
      session.id,
      entityId,
      notificationType,
      "New review",
    );

    sendNotificationToFollowersController({
      notificationId: notification.id,
      userId: session.id,
    });
  }

  return review;
}
