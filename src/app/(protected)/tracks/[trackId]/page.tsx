import Image from "next/image";
import Link from "next/link";

export default function TrackPage({
  params,
}: {
  params: {
    trackId: string;
  };
}) {
  const { trackId } = params;

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">Witaj w hotelu Marmur</h1>
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Image
              src="/taco2.jpeg"
              width={60}
              height={60}
              alt="dkdk"
              className="rounded-full"
            />
            <Link href={`/artists/{artistsId}`}>Taco Hemingway</Link>
            <span>2016</span>
            <Link href={`/albums/{albumId}`}>Marmur</Link>
            <span>3:50</span>
          </div>
        </div>
      </div>
    </section>
  );
}
