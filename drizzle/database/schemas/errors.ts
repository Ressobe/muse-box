import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const errors = sqliteTable("errors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  message: text("name").notNull().unique(),
  digset: text("digset"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
});
