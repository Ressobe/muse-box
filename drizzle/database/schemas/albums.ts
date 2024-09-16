import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tracks } from "./tracks";
import { artists } from "./artists";
import { albumsStats } from "./stats";

export const albums = sqliteTable("albums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  artistId: text("artistId")
    .references(() => artists.id, {
      onDelete: "cascade",
    })
    .notNull(),
  typeId: integer("typeId")
    .references(() => albumsTypes.id)
    .notNull(),
  title: text("title").notNull(),
  image: text("image").default(""),
  length: integer("length").default(0),
  releaseDate: integer("releaseDate", { mode: "timestamp" }).default(
    new Date(),
  ),
});

export const albumsRelations = relations(albums, ({ one, many }) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
  albumType: one(albumsTypes, {
    fields: [albums.typeId],
    references: [albumsTypes.id],
  }),
  stats: one(albumsStats, {
    fields: [albums.id],
    references: [albumsStats.entityId],
  }),
  tracks: many(tracks),
}));

export const albumsTypes = sqliteTable("albumsTypes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});
