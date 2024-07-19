CREATE TABLE `albumsStats` (
	`albumId` text PRIMARY KEY NOT NULL,
	`likes` integer DEFAULT 0,
	`popularity` integer DEFAULT 0,
	FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `artistsStats` (
	`artistId` text PRIMARY KEY NOT NULL,
	`likes` integer DEFAULT 0,
	`popularity` integer DEFAULT 0,
	FOREIGN KEY (`artistId`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reviewsAlbums` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`albumId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`albumId`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reviewsTracks` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`trackId` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`trackId`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tracksStats` (
	`trackId` text PRIMARY KEY NOT NULL,
	`likes` integer DEFAULT 0,
	`popularity` integer DEFAULT 0,
	FOREIGN KEY (`trackId`) REFERENCES `tracks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `reviews` RENAME TO `reviewsArtists`;--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `albums` ADD `image` text;--> statement-breakpoint
ALTER TABLE `artists` ADD `image` text;--> statement-breakpoint
ALTER TABLE `tracks` ADD `image` text;--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/