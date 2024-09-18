import { z } from "zod";
import { tracks } from "@/drizzle/database/schemas";
import { createInsertSchema } from "drizzle-zod";

export const insertTrackSchema = createInsertSchema(tracks);

export type Track = z.infer<typeof insertTrackSchema>;
