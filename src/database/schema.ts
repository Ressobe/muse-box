import { relations } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  password: text("password"),
  image: text("image"),
});

export const userProfiles = sqliteTable("userProfiles", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  favoriteArtistId: text("favoriteArtistId").references(() => artists.id),
  favoriteAlbumId: text("favoriteAlbumId").references(() => albums.id),
  favoriteTrackId: text("favoriteTrackId").references(() => tracks.id),
});

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

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable("verificationTokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text("token").notNull(),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  email: text("email").notNull(),
});

export const passwordResetTokens = sqliteTable("passwordResetTokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  token: text("token").notNull(),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  email: text("email").notNull(),
});

export const authenticators = sqliteTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const artists = sqliteTable("artists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  bio: text("bio"),
  country: text("country"),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  albums: many(albums),
}));

export const albums = sqliteTable("albums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  artistId: text("artistId").references(() => artists.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
});

export const albumsRelations = relations(albums, ({ one }) => ({
  artist: one(artists),
}));

export const tracks = sqliteTable("tracks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  position: integer("position").notNull(),
  title: text("title").notNull(),
  albumId: text("albumId").references(() => albums.id, {
    onDelete: "cascade",
  }),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums),
}));
