export default function ProfilePage({
  params,
}: {
  params: {
    profileId: string;
  };
}) {
  const { profileId } = params;
  return (
    <div>
      <h1>Profile page: {profileId} </h1>
    </div>
  );
}
