import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { artists } from "./artists";
import { albums } from "./albums";
import { tracks } from "./tracks";
import { relations } from "drizzle-orm";

export const userProfiles = sqliteTable("userProfiles", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  favoriteArtistId: text("favoriteArtistId").references(() => artists.id),
  favoriteAlbumId: text("favoriteAlbumId").references(() => albums.id),
  favoriteTrackId: text("favoriteTrackId").references(() => tracks.id),
});

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));