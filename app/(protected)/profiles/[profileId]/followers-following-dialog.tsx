import { formatNumberWithPrefix } from "@/app/_lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { UserAvatar } from "@/app/_components/user/user-avatar";
import { FollowButton } from "@/app/_components/follow-button";
import Link from "next/link";
import { Separator } from "@/app/_components/ui/separator";
import { getProfileFollowingController } from "@/src/interface-adapters/controllers/profile/get-profile-following.controller";
import { getProfileFollowersController } from "@/src/interface-adapters/controllers/profile/get-profile-followers.controller";
import { isUserFollowingProfileController } from "@/src/interface-adapters/controllers/user/is-user-following-profile.controller";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

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
  const authUserId = await getAuthUserIdController();
  if (!authUserId) {
    return null;
  }

  let users = null;

  if (type === "following") {
    users = await getProfileFollowingController({ profileId });
  }

  if (type === "followers") {
    users = await getProfileFollowersController({ profileId });
  }

  if (!users) {
    return null;
  }

  const usersWithFollowState = await Promise.all(
    users.map(async (item) => ({
      ...item,
      isFollowed: await isUserFollowingProfileController({
        userId: authUserId,
        profileId: item.id,
      }),
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
        <DialogContent className="pt-12 md:max-w-screen-sm overflow-y-scroll max-h-screen">
          <ScrollArea className="h-96">
            <ul className="p-4 space-y-2 flex flex-col">
              {usersWithFollowState?.map((user) => {
                return (
                  <li key={user.id}>
                    <Link
                      href={`/profiles/${user.id}`}
                      className="w-full flex flex-col sm:flex-row items-center hover:bg-muted-foreground/10 justify-between gap-8 rounded-lg transition-all p-4"
                    >
                      <div className="flex items-center gap-6">
                        <UserAvatar avatarUrl={user.image} size="large" />
                        <span className="text-xl">{user.name}</span>
                      </div>
                      {authUserId !== user.id && (
                        <FollowButton
                          followerId={authUserId}
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
