export interface IAvatarsService {
  uploadAvatar(): Promise<void>;
  deleteAvatar(): Promise<void>;
}
