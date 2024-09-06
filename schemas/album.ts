import { z } from "zod";
import { albums } from "@/drizzle/database/schema";
import { createInsertSchema } from "drizzle-zod";

export const insertAlbumSchema = createInsertSchema(albums);

export type Album = z.infer<typeof insertAlbumSchema>;
