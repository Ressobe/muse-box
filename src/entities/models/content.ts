import { z } from "zod";

export const contentSchema = z.enum(["album", "artist", "track"]);

export type Content = z.infer<typeof contentSchema>;
