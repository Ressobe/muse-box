import { Settings } from "@/src/entities/models/settings";
import { User } from "@/src/entities/models/user";

export interface IUsersRepository {
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByName(name: string): Promise<User | undefined>;
  getUserById(userId: string): Promise<User | undefined>;
  insertUser(email: string, name: string, password: string): Promise<User>;
  verifyUser(userId: string, email: string): Promise<void>;
  updateUserPassword(userId: string, newPassword: string): Promise<void>;
  getUserImage(userId: string): Promise<string>;
  updateUser(userId: string, values: Settings): Promise<void>;
  getFilteredUsers(query: string, limit?: number): Promise<User[]>;
}
