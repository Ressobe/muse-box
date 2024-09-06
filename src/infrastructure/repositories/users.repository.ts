import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { db } from "@/drizzle/database/db";
import { eq, sql } from "drizzle-orm";
import { users } from "@/drizzle/database/schema";
import { Settings } from "@/src/entities/models/settings";

export class UsersRepository implements IUsersRepository {
  async getUserByEmail(email: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async getUserByName(name: string) {
    return await db.query.users.findFirst({
      where: eq(users.name, name),
    });
  }

  async getUserById(userId: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  }

  async insertUser(email: string, name: string, password: string) {
    const [user] = await db
      .insert(users)
      .values({
        email: email,
        name: name,
        password: password,
      })
      .returning();
    return user;
  }

  async verifyUser(userId: string, email: string) {
    await db
      .update(users)
      .set({
        email: email,
        emailVerified: new Date(),
      })
      .where(eq(users.id, userId));
  }

  async updateUserPassword(userId: string, newPassword: string) {
    await db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.id, userId));
  }

  async updateUserImage(userId: string, newImage: string) {
    return await db
      .update(users)
      .set({ image: newImage })
      .where(eq(users.id, userId));
  }

  async getUserImage(userId: string) {
    const [img] = await db
      .select({ image: users.image })
      .from(users)
      .where(eq(users.id, userId));
    return img.image ?? "";
  }

  async getFilteredUsers(query: string, limit?: number) {
    const filteredUsersQuery = db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      })
      .from(users)
      .where(sql`${users.name} LIKE ${`%${query}%`} COLLATE NOCASE`);

    if (typeof limit === "number") {
      filteredUsersQuery.limit(limit);
    }

    const filteredUsers = await filteredUsersQuery;

    return filteredUsers;
  }

  async updateUser(userId: string, values: Settings) {
    await db
      .update(users)
      .set({
        ...values,
      })
      .where(eq(users.id, userId));
  }
}
