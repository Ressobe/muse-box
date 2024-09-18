import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tracks } from "./tracks";
import { artists } from "./artists";
import { albums } from "./albums";

export const artistsStats = sqliteTable("artistsStats", {
  entityId: text("entityId")
    .primaryKey()
    .references(() => artists.id, { onDelete: "cascade" }),
  likes: integer("likes").default(0),
  popularity: integer("popularity").default(0),
  ratingAvg: real("rating").default(0),
  ratingSum: integer("ratingSum").default(0),
  ratingCount: integer("ratingCount").default(0),
});

export const albumsStats = sqliteTable("albumsStats", {
  entityId: text("entityId")
    .primaryKey()
    .references(() => albums.id, { onDelete: "cascade" }),
  likes: integer("likes").default(0),
  popularity: integer("popularity").default(0),
  ratingAvg: real("rating").default(0),
  ratingSum: integer("ratingSum").default(0),
  ratingCount: integer("ratingCount").default(0),
});

export const tracksStats = sqliteTable("tracksStats", {
  entityId: text("entityId")
    .primaryKey()
    .references(() => tracks.id, { onDelete: "cascade" }),
  likes: integer("likes").default(0),
  popularity: integer("popularity").default(0),
  ratingAvg: real("rating").default(0),
  ratingSum: integer("ratingSum").default(0),
  ratingCount: integer("ratingCount").default(0),
});
