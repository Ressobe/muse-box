import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { albums } from "./albums";
import { artists } from "./artists";
import { tracksStats } from "./stats";

export const tracks = sqliteTable("tracks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  artistsCredits: text("artistsCredits")
    .references(() => artistsCredits.id, {
      onDelete: "cascade",
    })
    .notNull(),
  albumId: text("albumId")
    .references(() => albums.id, {
      onDelete: "cascade",
    })
    .notNull(),
  position: integer("position").notNull(),
  title: text("title").notNull(),
  image: text("image").default(""),
  length: integer("length").default(0),
});

export const artistsCredits = sqliteTable("artistsCredits", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
});

export const artistsCreditsRelations = relations(
  artistsCredits,
  ({ many }) => ({
    artistsCreditsNames: many(artistsCreditsNames),
  }),
);

export const artistsCreditsNames = sqliteTable("artistsCreditsName", {
  artistCreditId: text("artistCreditId")
    .references(() => artistsCredits.id)
    .notNull(),
  artistId: text("artistId")
    .references(() => artists.id, {
      onDelete: "cascade",
    })
    .notNull(),
  position: integer("position").notNull(),
  name: text("name").notNull(),
  joinPhrase: text("joinPhrase"),
});

export const artistsCreditsNamesRelations = relations(
  artistsCreditsNames,
  ({ one }) => ({
    artistCredit: one(artistsCredits, {
      fields: [artistsCreditsNames.artistCreditId],
      references: [artistsCredits.id],
    }),
    artist: one(artists, {
      fields: [artistsCreditsNames.artistId],
      references: [artists.id],
    }),
  }),
);

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
  stats: one(tracksStats, {
    fields: [tracks.id],
    references: [tracksStats.entityId],
  }),
  artistCredit: one(artistsCredits, {
    fields: [tracks.artistsCredits],
    references: [artistsCredits.id],
  }),
}));
