import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { albums } from "./albums";
import { reviewsArtists } from "./reviews";
import { artistsStats } from "./stats";

export const artists = sqliteTable("artists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  image: text("image").default(""),
  bio: text("bio").default(""),
  beginDateYear: integer("beginDateYear"),
  beginDateMonth: integer("beginDateMonth"),
  beginDateDay: integer("beginDateDay"),
  endDateYear: integer("endDateYear"),
  endDateMonth: integer("endDateMonth"),
  endDateDay: integer("endDateDay"),
  type: integer("type")
    .references(() => artistsTypes.id)
    .notNull(),
  country: text("country").references(() => countries.id),
  gender: integer("gender").references(() => genders.id),
});

export const genders = sqliteTable("genders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const artistsTypes = sqliteTable("artistsTypes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const countries = sqliteTable("countries", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
});

export const artistsRelations = relations(artists, ({ many, one }) => ({
  albums: many(albums),
  reviews: many(reviewsArtists),
  stats: one(artistsStats, {
    fields: [artists.id],
    references: [artistsStats.entityId],
  }),
}));
