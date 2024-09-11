import { z } from "zod";

const content = ["album", "artist", "track"] as const;

export const contentSchema = z.enum(content);

export type Content = z.infer<typeof contentSchema>;

export function isValidContentType(
  value: string | undefined,
): value is Content {
  return content.includes(value as Content);
}
