import { getFilteredUsersUseCase } from "@/src/application/use-cases/user/get-filtered-users.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { User } from "@/src/entities/models/user";

function presenter(users: User[]) {
  return users.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image ?? "",
  }));
}

export async function getFilteredUsersController(query: string | undefined) {
  if (!query) {
    throw new InputParseError("Query not provided");
  }

  const users = await getFilteredUsersUseCase(query);

  return presenter(users);
}
