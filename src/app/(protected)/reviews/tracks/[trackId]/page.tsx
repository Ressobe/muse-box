export default function TrackReviewsPage({
  params,
}: {
  params: {
    trackId: string;
  };
}) {
  const { trackId } = params;
  return (
    <div>
      <h1>Track reviews page: {trackId}</h1>
    </div>
  );
}
