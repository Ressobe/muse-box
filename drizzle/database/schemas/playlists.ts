import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const PlaylistItemType = {
  ARTIST: "artist",
  ALBUM: "album",
  TRACK: "track",
};

type PlaylistItemType =
  (typeof PlaylistItemType)[keyof typeof PlaylistItemType];

export const playlists = sqliteTable("playlists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
});

export const playlistItems = sqliteTable(
  "playlistItems",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    playlistId: text("playlistId")
      .notNull()
      .references(() => playlists.id, { onDelete: "cascade" }),
    itemType: text("itemType").$type<PlaylistItemType>().notNull(),
    itemId: text("itemId").notNull(),
  },
  (table) => ({
    playlistIditemIdUniqueIndex: uniqueIndex("unique_playlist_item_index").on(
      table.playlistId,
      table.itemId,
    ),
  }),
);

export const playlistItemsRelations = relations(playlistItems, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistItems.playlistId],
    references: [playlists.id],
  }),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.id],
  }),
  items: many(playlistItems),
}));
