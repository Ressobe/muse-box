import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({});

type ControllerInput = z.infer<typeof inputSchema>;

export async function updateStatsForNewRatingController(
  input: ControllerInput,
) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError(
      "Invalid input in updateStatsForNewRatingController",
    );
  }
}
