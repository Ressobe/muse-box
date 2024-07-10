ALTER TABLE `albumsTypes` RENAME COLUMN `type` TO `name`;--> statement-breakpoint
DROP INDEX IF EXISTS `albumsTypes_type_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `albumsTypes_name_unique` ON `albumsTypes` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `genres_name_unique` ON `genres` (`name`);