import { TrackCard } from "@/app/_components/track/track-card";
import { getNewTracksController } from "@/src/interface-adapters/controllers/track/get-new-tracks.controller";
import { getPopularTracksController } from "@/src/interface-adapters/controllers/track/get-popular-tracks.controller";
import { getTopTracksController } from "@/src/interface-adapters/controllers/track/get-top-tracks.controller";

export const dynamic = "force-dynamic";

export default async function TracksPage() {
  const topTracks = await getTopTracksController();
  const popularTracks = await getPopularTracksController();
  const newTracks = await getNewTracksController();

  return (
    <section className="w-full space-y-20">
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
