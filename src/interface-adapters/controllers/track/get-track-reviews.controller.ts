import { getTrackReviewsUseCase } from "@/src/application/use-cases/track/get-track-reviews.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { ReviewWithUser } from "@/src/entities/models/review";
import { z } from "zod";

const inputSchema = z.object({
  trackId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

function presenter(reviews: ReviewWithUser[]) {
  return reviews.map((item) => ({
    ...item,
    user: {
      id: item.user.id,
      name: item.user.name,
    },
  }));
}

export async function getTrackReviewsController(input: ControllerInput) {
  const { data, error } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Track id not provided");
  }

  const reviews = await getTrackReviewsUseCase(data.trackId);

  return presenter(reviews);
}
