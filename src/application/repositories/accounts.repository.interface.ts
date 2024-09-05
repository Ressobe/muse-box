import { Account } from "@/src/entities/models/account";

export interface IAccountsRepository {
  getAccountByUserId(userId: string): Promise<Account | undefined>;
}
