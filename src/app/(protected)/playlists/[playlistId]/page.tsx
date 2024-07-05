export default async function PlaylistPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const { playlistId } = params;
  return (
    <div>
      <h1>Playlist page: {playlistId} </h1>
    </div>
  );
}
