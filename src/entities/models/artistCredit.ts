import { z } from "zod";
import { artistCreditNameSchema } from "./artistCreditName";

export const artistCreditSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
});

export const artistCreditWithNamesSchema = artistCreditSchema.extend({
  artistsCreditsNames: artistCreditNameSchema.array(),
});

export type ArtistCredit = z.infer<typeof artistCreditSchema>;
