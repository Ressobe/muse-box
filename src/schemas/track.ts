import { z } from "zod";
import { tracks } from "@/database/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertTrackSchema = createInsertSchema(tracks);

export type Track = z.infer<typeof insertTrackSchema>;
