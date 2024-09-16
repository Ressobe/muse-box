import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { NotificationType } from "@/src/entities/models/notification";
import { relations } from "drizzle-orm";

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
