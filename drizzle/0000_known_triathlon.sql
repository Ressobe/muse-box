CREATE TABLE `account` (
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `albums` (
	`id` text PRIMARY KEY NOT NULL,
	`artistId` text NOT NULL,
	`typeId` integer NOT NULL,
	`title` text NOT NULL,
	`image` text DEFAULT '',
	`length` integer DEFAULT 0,
	`releaseDate` integer DEFAULT '"2024-08-13T11:11:08.966Z"',
	FOREIGN KEY (`artistId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`typeId`) REFERENCES `albumsTypes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `albumsStats` (
	`entityId` text PRIMARY KEY NOT NULL,
	`likes` integer DEFAULT 0,
	`popularity` integer DEFAULT 0,
	`rating` real DEFAULT 0,
	`ratingSum` integer DEFAULT 0,
	`ratingCount` integer DEFAULT 0,
	FOREIGN KEY (`entityId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `albumsTypes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `artists` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`bio` text DEFAULT '',
	`country` text DEFAULT '',
	`image` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `artistsStats` (
	`entityId` text PRIMARY KEY NOT NULL,
	`likes` integer DEFAULT 0,
	`popularity` integer DEFAULT 0,
	`rating` real DEFAULT 0,
	`ratingSum` integer DEFAULT 0,
	`ratingCount` integer DEFAULT 0,
	FOREIGN KEY (`entityId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `authenticator` (
	`credentialID` text NOT NULL,
	`userId` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`credentialPublicKey` text NOT NULL,
	`counter` integer NOT NULL,
	`credentialDeviceType` text NOT NULL,
	`credentialBackedUp` integer NOT NULL,
	`transports` text,
	PRIMARY KEY(`credentialID`, `userId`),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `follows` (
	`followerId` text NOT NULL,
	`followingId` text NOT NULL,
	PRIMARY KEY(`followerId`, `followingId`),
	FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`followingId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `genresToArtists` (
	`artistId` text NOT NULL,
	`genreId` integer NOT NULL,
	FOREIGN KEY (`artistId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notificationRecipients` (
	`notificationId` text NOT NULL,
	`ownerId` text NOT NULL,
	`isRead` integer DEFAULT false,
	FOREIGN KEY (`notificationId`) REFERENCES `userNotifications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `passwordResetTokens` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `playlistItems` (
	`id` text PRIMARY KEY NOT NULL,
	`playlistId` text NOT NULL,
	`itemType` text NOT NULL,
	`itemId` text NOT NULL,
	FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `playlists` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reviewsAlbums` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`entityId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`createdAt` integer DEFAULT '"2024-08-13T11:11:08.967Z"',
	`entityType` text DEFAULT 'album' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`entityId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reviewsArtists` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`entityId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`createdAt` integer DEFAULT '"2024-08-13T11:11:08.967Z"',
	`entityType` text DEFAULT 'artist' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`entityId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reviewsTracks` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`entityId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`createdAt` integer DEFAULT '"2024-08-13T11:11:08.967Z"',
	`entityType` text DEFAULT 'track' NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`entityId`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` text PRIMARY KEY NOT NULL,
	`artistId` text NOT NULL,
	`albumId` text NOT NULL,
	`position` integer NOT NULL,
	`title` text NOT NULL,
	`image` text DEFAULT '',
	`length` integer DEFAULT 0,
	FOREIGN KEY (`artistId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tracksStats` (
	`entityId` text PRIMARY KEY NOT NULL,
	`likes` integer DEFAULT 0,
	`popularity` integer DEFAULT 0,
	`rating` real DEFAULT 0,
	`ratingSum` integer DEFAULT 0,
	`ratingCount` integer DEFAULT 0,
	FOREIGN KEY (`entityId`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `userNotifications` (
	`id` text PRIMARY KEY NOT NULL,
	`senderId` text NOT NULL,
	`type` text NOT NULL,
	`resourceId` text NOT NULL,
	`message` text NOT NULL,
	`createdAt` integer DEFAULT '"2024-08-13T11:11:08.967Z"',
	FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`userId` text PRIMARY KEY NOT NULL,
	`favoriteArtistId` text,
	`favoriteAlbumId` text,
	`favoriteTrackId` text,
	`bio` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`favoriteArtistId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`favoriteAlbumId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`favoriteTrackId`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer,
	`password` text,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verificationTokens` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `albumsTypes_name_unique` ON `albumsTypes` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `genres_name_unique` ON `genres` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_playlist_item_index` ON `playlistItems` (`playlistId`,`itemId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_name_unique` ON `users` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);