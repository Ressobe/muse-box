/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `reviewsAlbums` ADD `entityType` text DEFAULT 'album' NOT NULL;--> statement-breakpoint
ALTER TABLE `reviewsArtists` ADD `entityType` text DEFAULT 'artist' NOT NULL;--> statement-breakpoint
ALTER TABLE `reviewsTracks` ADD `entityType` text DEFAULT 'track' NOT NULL;