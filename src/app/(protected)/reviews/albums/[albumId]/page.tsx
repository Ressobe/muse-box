export default function AlbumReviewsPage({
  params,
}: {
  params: {
    albumId: string;
  };
}) {
  const { albumId } = params;
  return (
    <div>
      <h1>Album reviews page: {albumId}</h1>
    </div>
  );
}
