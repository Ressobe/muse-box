import { sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const follows = sqliteTable(
  "follows",
  {
    followerId: text("followerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: text("followingId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (follows) => ({
    compoundKey: primaryKey({
      columns: [follows.followerId, follows.followingId],
    }),
  }),
);

export const followsRelations = relations(follows, ({ one }) => ({
  followingUser: one(users, {
    fields: [follows.followingId],
    references: [users.id],
  }),
  followerUser: one(users, {
    fields: [follows.followerId],
    references: [users.id],
  }),
}));
