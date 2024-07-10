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
  reviews: many(reviews),
}));

export const albums = sqliteTable("albums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  artistId: text("artistId")
    .references(() => artists.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  typeId: integer("typeId")
    .references(() => albumsTypes.id)
    .notNull(),
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
  tracks: many(tracks),
}));

export const albumsTypes = sqliteTable("albumsTypes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const tracks = sqliteTable("tracks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  position: integer("position").notNull(),
  title: text("title").notNull(),
  artistId: text("artistId")
    .references(() => artists.id, {
      onDelete: "cascade",
    })
    .notNull(),
  albumId: text("albumId")
    .references(() => albums.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
  artist: one(artists, {
    fields: [tracks.artistId],
    references: [artists.id],
  }),
}));

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const genresToArtists = sqliteTable("genresToArtists", {
  artistId: text("artistId")
    .notNull()
    .references(() => artists.id),
  genreId: integer("genreId")
    .notNull()
    .references(() => genres.id),
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

export const reviews = sqliteTable("reviews", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  artistId: text("artistId")
    .notNull()
    .references(() => artists.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  artist: one(artists, {
    fields: [reviews.artistId],
    references: [artists.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));
