import { formatNumberWithPrefix } from "@/lib/utils";
import {
  getProfileFollowersUseCase,
  getProfileFollowingUseCase,
} from "@/use-cases/profile";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { currentUser } from "@/lib/auth";
import { UserAvatar } from "@/app/_components/user/user-avatar";
import { FollowButton } from "@/app/_components/follow-button";
import { isUserFollowingProfileUseCase } from "@/use-cases/user";
import Link from "next/link";
import { Separator } from "@/app/_components/ui/separator";

type FollowersFollowingDialogProps = {
  type: "followers" | "following";
  amount: number;
  profileId: string;
};

export async function FollowersFollowingDialog({
  type,
  amount,
  profileId,
}: FollowersFollowingDialogProps) {
  const authUser = await currentUser();
  if (!authUser) {
    return null;
  }

  let users = null;

  if (type === "following") {
    users = await getProfileFollowingUseCase(profileId);
  }

  if (type === "followers") {
    users = await getProfileFollowersUseCase(profileId);
  }

  if (!users) {
    return null;
  }

  const usersWithFollowState = await Promise.all(
    users.map(async (item) => ({
      ...item,
      isFollowed: await isUserFollowingProfileUseCase(authUser.id, item.id),
    })),
  );

  return (
    <Dialog>
      <DialogTrigger>
        <h2 className="text-2xl p-2 transition-all hover:text-muted-foreground">
          {type === "followers" ? "Followers" : "Following"}
        </h2>
      </DialogTrigger>
      <span className="text-3xl font-bold">
        {formatNumberWithPrefix(amount)}
      </span>
      {amount > 0 ? (
        <DialogContent className="pt-12">
          <ScrollArea className="h-96">
            <ul className="p-4 space-y-2 flex flex-col">
              {usersWithFollowState?.map((user) => {
                return (
                  <li key={user.id}>
                    <Link
                      href={`/profiles/${user.id}`}
                      className="w-full flex items-center hover:bg-muted-foreground/10 justify-between gap-8 rounded-lg transition-all p-4"
                    >
                      <div className="flex items-center gap-6">
                        <UserAvatar avatarUrl={user.image} size="large" />
                        <span className="text-xl">{user.name}</span>
                      </div>
                      {authUser.id !== user.id && (
                        <FollowButton
                          followerId={authUser.id}
                          followingId={user.id}
                          defaultFollowState={user.isFollowed}
                        />
                      )}
                    </Link>
                    <Separator />
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
