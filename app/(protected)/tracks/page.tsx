import { CardsLoading } from "@/app/_components/loading/cards-loading";
import { SeeMoreButton } from "@/app/_components/see-more-button";
import { TrackCard } from "@/app/_components/track/track-card";
import { TrackWithAlbum } from "@/src/entities/models/track";
import { getNewTracksController } from "@/src/interface-adapters/controllers/track/get-new-tracks.controller";
import { getPopularTracksController } from "@/src/interface-adapters/controllers/track/get-popular-tracks.controller";
import { getTopTracksController } from "@/src/interface-adapters/controllers/track/get-top-tracks.controller";
import { unstable_cache as cache } from "next/cache";
import { Suspense } from "react";

const getCachedTopTracks = cache(
  async () => getTopTracksController(),
  ["top-tracks"],
  { revalidate: 600 },
);

const getCachedPopularTracks = cache(
  async () => getPopularTracksController(),
  ["popular-tracks"],
  { revalidate: 600 },
);

const getCachedNewTracks = cache(
  async () => getNewTracksController(),
  ["new-tracks"],
  { revalidate: 600 },
);

export default async function TracksPage() {
  const topTracks = await getCachedTopTracks();
  const popularTracks = await getCachedPopularTracks();
  const newTracks = await getCachedNewTracks();

  return (
    <section className="w-full space-y-20">
      <div>
        <Suspense fallback={<CardsLoading />}>
          <TracksSection title="Top songs" tracks={topTracks} />
        </Suspense>
        <SeeMoreButton href="/tracks/search" />
      </div>
      <div>
        <Suspense fallback={<CardsLoading />}>
          <TracksSection title="Popular songs" tracks={popularTracks} />
        </Suspense>
        <SeeMoreButton href="/tracks/search" />
      </div>
      <div>
        <Suspense fallback={<CardsLoading />}>
          <TracksSection title="New songs" tracks={newTracks} />
        </Suspense>
        <SeeMoreButton href="/tracks/search" />
      </div>
    </section>
  );
}

type TracksSectionProps = {
  title: string;
  tracks: TrackWithAlbum[];
};

function TracksSection({ title, tracks }: TracksSectionProps) {
  return (
    <section>
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
        {tracks.map((track) => {
          return <TrackCard key={track.id} track={track} />;
        })}
      </div>
    </section>
  );
}
