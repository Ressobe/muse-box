CREATE TABLE `follows` (
	`followerId` text NOT NULL,
	`followingId` text NOT NULL,
	PRIMARY KEY(`followerId`, `followingId`),
	FOREIGN KEY (`followerId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`followingId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`userId` text PRIMARY KEY NOT NULL,
	`favoriteArtistId` text,
	`favoriteAlbumId` text,
	`favoriteTrackId` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`favoriteArtistId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`favoriteAlbumId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`favoriteTrackId`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE no action
);
