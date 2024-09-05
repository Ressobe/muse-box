import { User } from "@/src/entities/models/user";

export interface IUsersRepository {
  getUserByEmail(email: string): Promise<User>;
  getUserByName(name: string): Promise<User>;
  getUserById(userId: string): Promise<User>;
  verifyUser(userId: string, email: string): Promise<void>;
  updateUserPassword(userId: string, newPassword: string): Promise<void>;
}
