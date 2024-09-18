import { container } from "@/di/container";
import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";

export async function sendNotificationToFollowersUseCase(
  notificationId: string,
  profileId: string,
) {
  const notificationsRepository = container.get<INotificationsRepository>(
    "INotificationsRepository",
  );
  const followersRepository = container.get<IFollowersRepository>(
    "IFollowersRepository",
  );

  const followers = await followersRepository.getFollowersForProfile(profileId);

  await notificationsRepository.sendNotificationToFollowers(
    notificationId,
    followers,
  );
}
