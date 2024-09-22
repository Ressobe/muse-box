import { container } from "@/di/container";
import { IAccountsRepository } from "@/src/application/repositories/accounts.repository.interface";

export async function getAccountByUserIdUseCase(userId: string) {
  const accountsRepository = container.get<IAccountsRepository>(
    "IAccountsRepository",
  );

  return accountsRepository.getAccountByUserId(userId);
}
