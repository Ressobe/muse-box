import { z } from "zod";
import { artists } from "@/drizzle/database/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertArtistSchema = createInsertSchema(artists);

export type Artist = z.infer<typeof insertArtistSchema>;
