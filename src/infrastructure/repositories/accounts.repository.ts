import { IAccountsRepository } from "@/src/application/repositories/accounts.repository.interface";
import { Account } from "@/src/entities/models/account";
import { db } from "@/drizzle/database/db";
import { accounts } from "@/drizzle/database/schemas";
import { eq } from "drizzle-orm";

export class AccountsRepository implements IAccountsRepository {
  async getAccountByUserId(userId: string): Promise<Account | undefined> {
    return await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId),
    });
  }
}
