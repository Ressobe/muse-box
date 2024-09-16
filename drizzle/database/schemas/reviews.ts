import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { albums } from "./albums";
import { relations } from "drizzle-orm";
import { artists } from "./artists";
import { tracks } from "./tracks";

export const reviewsArtists = sqliteTable("reviewsArtists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  entityId: text("entityId")
    .notNull()
    .references(() => artists.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
  entityType: text("entityType").notNull().default("artist"),
});

export const reviewsArtistsRelations = relations(reviewsArtists, ({ one }) => ({
  artist: one(artists, {
    fields: [reviewsArtists.entityId],
    references: [artists.id],
  }),
  user: one(users, {
    fields: [reviewsArtists.userId],
    references: [users.id],
  }),
}));

export const reviewsAlbums = sqliteTable("reviewsAlbums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  entityId: text("entityId")
    .notNull()
    .references(() => albums.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
  entityType: text("entityType").notNull().default("album"),
});

export const reviewsAlbumsRelations = relations(reviewsAlbums, ({ one }) => ({
  album: one(albums, {
    fields: [reviewsAlbums.entityId],
    references: [albums.id],
  }),
  user: one(users, {
    fields: [reviewsAlbums.userId],
    references: [users.id],
  }),
}));

export const reviewsTracks = sqliteTable("reviewsTracks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  entityId: text("entityId")
    .notNull()
    .references(() => tracks.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
  entityType: text("entityType").notNull().default("track"),
});

export const reviewsTracksRelations = relations(reviewsTracks, ({ one }) => ({
  track: one(tracks, {
    fields: [reviewsTracks.entityId],
    references: [tracks.id],
  }),
  user: one(users, {
    fields: [reviewsTracks.userId],
    references: [users.id],
  }),
}));
