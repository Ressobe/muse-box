import { UserSelect } from "@/src/entities/models/user";
import { UserCard } from "./user-card";

type UsersCards = {
  users: UserSelect[];
};

export async function UsersCards({ users }: UsersCards) {
  return (
    <>
      {users.length > 0 ? (
        users.map((item) => {
          return (
            <UserCard
              key={item.id}
              user={{ ...item, image: item.image ?? "" }}
            />
          );
        })
      ) : (
        <span className="pl-4 pt-8 text-lg">No users</span>
      )}
    </>
  );
}
