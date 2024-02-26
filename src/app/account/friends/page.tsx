import getServerProfileSession from "@/src/lib/session";

export default async function FriendsPage() {
  const profile = await getServerProfileSession();

  if (!profile) {
    console.log("nie zalogowany");
    return null;
  }

  return (
    <div>
      {profile.friendsOf.map((friend) => {
        return <span key={friend.id}>{friend.name}</span>;
      })}
    </div>
  );
}
