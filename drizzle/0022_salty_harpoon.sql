CREATE TABLE `userActivities` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`activityType` text NOT NULL,
	`entityId` text NOT NULL,
	`rating` integer,
	`comment` text,
	`createdAt` integer DEFAULT '"2024-07-22T16:51:26.743Z"',
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/