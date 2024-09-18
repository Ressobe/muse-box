import { z } from "zod";
import { artists } from "@/drizzle/database/schemas";
import { createInsertSchema } from "drizzle-zod";

export const insertArtistSchema = createInsertSchema(artists);

export type Artist = z.infer<typeof insertArtistSchema>;
