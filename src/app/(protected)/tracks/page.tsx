import { TrackCard } from "@/components/track/track-card";
import {
  getNewTracksUseCase,
  getPopularTracksUseCase,
  getTopTracksUseCase,
} from "@/use-cases/track";

export const dynamic = "force-dynamic";

export default async function TracksPage() {
  const topTracks = await getTopTracksUseCase();
  const popularTracks = await getPopularTracksUseCase();
  const newTracks = await getNewTracksUseCase();

  return (
    <section className="w-full space-y-10">
      <section>
        <h1 className="font-bold text-3xl">Top songs</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {topTracks.map((track) => {
            return <TrackCard key={track.id} track={track} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">Popular songs</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {popularTracks.map((track) => {
            return <TrackCard key={track.id} track={track} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">New songs</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {newTracks.map((track) => {
            return <TrackCard key={track.id} track={track} />;
          })}
        </div>
      </section>
    </section>
  );
}
