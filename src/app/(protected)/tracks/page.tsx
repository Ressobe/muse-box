import {
  getNewTracksUseCase,
  getPopularTracksUseCase,
  getTopTracksUseCase,
} from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";

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

type TrackCardProps = {
  track: {
    title: string;
    id: string;
    image: string | null;
  };
};

function TrackCard({ track }: TrackCardProps) {
  return (
    <Link
      href={`/tracks/${track.id}`}
      className="transition-all p-4 hover:bg-secondary/40 rounded"
    >
      <div>
        <Image src={track.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="pt-4">{track.title}</div>
        <div className="text-muted-foreground">2012</div>
      </div>
    </Link>
  );
}
