import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { artists } from "./artists";
import { relations } from "drizzle-orm";

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const genresToArtists = sqliteTable("genresToArtists", {
  artistId: text("artistId")
    .notNull()
    .references(() => artists.id, { onDelete: "cascade" }),
  genreId: integer("genreId")
    .notNull()
    .references(() => genres.id, { onDelete: "cascade" }),
});

export const genresToArtistsRelations = relations(
  genresToArtists,
  ({ one }) => ({
    artist: one(artists, {
      fields: [genresToArtists.artistId],
      references: [artists.id],
    }),
    genre: one(genres, {
      fields: [genresToArtists.genreId],
      references: [genres.id],
    }),
  }),
);
