import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { HeartIcon, SquarePlus } from "lucide-react";
import { TopTracks } from "@/components/top-tracks";
import { Albums } from "@/components/albums";
import { SingleEps } from "@/components/single-eps";
import { Reviews } from "@/components/reviews";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;
  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    notFound();
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-20">
        <Avatar className="h-40 w-40">
          <AvatarImage src="" />
          <AvatarFallback>
            <FaUser className="w-20 h-20" />
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <div>Artist</div>
          <h1 className="font-bold text-4xl">{artist.name}</h1>
          <ul className="flex py-4 gap-x-6">
            <li className="border p-2 transition-all hover:bg-secondary">
              Heavy metal
            </li>
            <li className="border p-2 transition-all hover:bg-secondary">
              Rock
            </li>
            <li className="border p-2 transition-all hover:bg-secondary">
              Thrash metal
            </li>
            <li className="border p-2 transition-all hover:bg-secondary">
              Death metal
            </li>
          </ul>
        </div>
        <div className="flex gap-x-4">
          <HeartIcon className="w-10 h-10" />
          <SquarePlus className="w-10 h-10" />
        </div>
      </div>
      <TopTracks />
      <Albums artistId={artistId} />
      <SingleEps artistId={artistId} />
      <Reviews />
    </section>
  );
}
