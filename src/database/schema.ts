import { NotificationType } from "@/types/notification";
import { relations } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  real,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const PlaylistItemType = {
  ARTIST: "artist",
  ALBUM: "album",
  TRACK: "track",
};

type PlaylistItemType =
  (typeof PlaylistItemType)[keyof typeof PlaylistItemType];

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  email: text("email").notNull().unique(),
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

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

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

export const followsRelations = relations(follows, ({ one }) => ({
  followingUser: one(users, {
    fields: [follows.followingId],
    references: [users.id],
  }),
  followerUser: one(users, {
    fields: [follows.followerId],
    references: [users.id],
  }),
}));

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
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

export const albumsTypes = sqliteTable("albumsTypes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

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

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
  // artist: one(artists, {
  //   fields: [tracks.artistsCredits],
  //   references: [artists.id],
  // }),
  stats: one(tracksStats, {
    fields: [tracks.id],
    references: [tracksStats.entityId],
  }),
}));

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

export const userNotifications = sqliteTable("userNotifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  senderId: text("senderId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<NotificationType>().notNull(),
  resourceId: text("resourceId").notNull(),
  message: text("message").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(new Date()),
});

export const userNotificationsRelations = relations(
  userNotifications,
  ({ one }) => ({
    sender: one(users, {
      fields: [userNotifications.senderId],
      references: [users.id],
    }),
  }),
);

export const notificationRecipients = sqliteTable("notificationRecipients", {
  notificationId: text("notificationId")
    .notNull()
    .references(() => userNotifications.id, { onDelete: "cascade" }),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isRead: integer("isRead", { mode: "boolean" }).default(false),
});

export const notificationRecipientsRelations = relations(
  notificationRecipients,
  ({ one }) => ({
    notification: one(userNotifications, {
      fields: [notificationRecipients.notificationId],
      references: [userNotifications.id],
    }),
    owner: one(users, {
      fields: [notificationRecipients.ownerId],
      references: [users.id],
    }),
  }),
);
