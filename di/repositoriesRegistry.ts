import { AccountsRepository } from "@/src/infrastructure/repositories/accounts.repository";
import { AlbumsRepository } from "@/src/infrastructure/repositories/albums.repository";
import { ArtistsRepository } from "@/src/infrastructure/repositories/artists.repository";
import { FollowersRepository } from "@/src/infrastructure/repositories/followers.repository";
import { GenresRepository } from "@/src/infrastructure/repositories/genres.repository";
import { NotificationsRepository } from "@/src/infrastructure/repositories/notifications.repository";
import { PasswordResetTokenRepository } from "@/src/infrastructure/repositories/password-reset-token.repository";
import { PlaylistsRepository } from "@/src/infrastructure/repositories/playlists.repository";
import { ProfilesRepository } from "@/src/infrastructure/repositories/profiles.repository";
import { ReviewsRepository } from "@/src/infrastructure/repositories/reviews.repository";
import { StatsRepository } from "@/src/infrastructure/repositories/stats.repository";
import { TracksRepository } from "@/src/infrastructure/repositories/tracks.repository";
import { UsersRepository } from "@/src/infrastructure/repositories/users.repository";
import { VerificationTokensRepository } from "@/src/infrastructure/repositories/verification-tokens.repository";

export const repositoriesRegistry = {
  IAccountsRepository: AccountsRepository,
  IAlbumsRepository: AlbumsRepository,
  IArtistsRepository: ArtistsRepository,
  IFollowersRepository: FollowersRepository,
  IGenresRepository: GenresRepository,
  INotificationsRepository: NotificationsRepository,
  IPasswordResetTokensRepository: PasswordResetTokenRepository,
  IPlaylistsRepository: PlaylistsRepository,
  IProfilesRepository: ProfilesRepository,
  IReviewsRepository: ReviewsRepository,
  IStatsRepository: StatsRepository,
  ITracksRepository: TracksRepository,
  IUsersRepository: UsersRepository,
  IVerificationTokensRepository: VerificationTokensRepository,
};
