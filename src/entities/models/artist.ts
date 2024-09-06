import { z } from "zod";

export const artistSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().default(""),
  bio: z.string().default(""),
  beginDateYear: z.number().optional(),
  beginDateMonth: z.number().optional(),
  beginDateDay: z.number().optional(),

  endDateYear: z.number().optional(),
  endDateMonth: z.number().optional(),
  endDateDay: z.number().optional(),

  type: z.number(),
  country: z.string(),
  gender: z.number(),
});

export type Artist = z.infer<typeof artistSchema>;
