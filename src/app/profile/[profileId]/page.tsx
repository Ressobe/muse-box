import {
  getProfileByProfileId,
  isFollowingProfile,
  isFriendProfile,
  isInvitedToFriendProfile,
} from "@/src/database/profile";
import getServerProfileSession from "@/src/lib/session";
import ProfileCard from "./profile-card";
import InviteToFriend from "./invite-to-friend";

export default async function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = params;

  const profileSession = await getServerProfileSession();
  const profile = await getProfileByProfileId(profileId);

  // Jeśli profil nie istnieje (albo ma prywatny profil) to muszę pokazać stronę
  // not found
  // Dodać żeby te komponent które muszą czekać na dane z serwera miały
  // swój loading state
  // Natomiast reszta (statyczna) część strony były w tym czasie pokazana

  if (!profile) {
    return null;
  }

  const isFollowedByProfileSession = await isFollowingProfile(
    profileSession?.id,
    profile.id
  );

  const isFriendWithProfileSession = await isFriendProfile(
    profile.id,
    profileSession?.id
  );

  const isInvitedByProfileSession = await isInvitedToFriendProfile(
    profile.id,
    profileSession?.id
  );

  // Jeszcze muszę sprawdzić czy na odwrót jest zaproszenie
  // czyli użytkownik który przegladą jakiś profil czasem może mieć
  // od niego zaproszenie do znajmoych
  // wtedy zamiast add friend mamy accept/reject request

  const favArtist = profile.favourite_artist;
  const favAlbum = profile.favourite_album;
  const favSong = profile.favourite_song;

  return (
    <section className="pt-20 flex flex-col items-center mx-20 gap-2">
      <img
        alt={`avatar ${profile.name}`}
        className="object-cover rounded-lg"
        height={200}
        src="/user.png"
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width={200}
      />
      <h1 className="text-4xl font-bold">{profile.name}</h1>
      <h1 className="text-4xl font-bold">{profile.surname}</h1>
      <h1 className="text-4xl font-bold">{profile.age}</h1>
      <div>{favArtist?.name}</div>
      <div>{favAlbum?.name}</div>
      <div>{favSong?.name}</div>
      <ProfileCard
        amountOfFollowers={profile.stats?.amount_of_followers}
        profileId={profile.id}
        profileSessionId={profileSession?.id}
        isFollowed={isFollowedByProfileSession}
      />
      <InviteToFriend
        isFriend={isFriendWithProfileSession}
        senderId={profileSession?.id}
        reciverId={profile.id}
        isInvitedAlready={isInvitedByProfileSession}
      />
    </section>
  );
}
