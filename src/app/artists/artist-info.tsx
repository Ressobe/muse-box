import { DiscAlbumIcon, Mic2, MusicIcon } from "lucide-react";

type ArtistInfoProps = {
  amountOfAlbums?: number;
  amountOfSingles?: number;
  amountOfTracks?: number;
};

export default function ArtistInfo({
  amountOfAlbums,
  amountOfSingles,
  amountOfTracks,
}: ArtistInfoProps) {
  return (
    <p className="flex items-center gap-x-2">
      <span className="font-semibold  flex items-center gap-2">
        <DiscAlbumIcon className="w-5 h-5" />
        {amountOfAlbums}
        <span className="font-normal">Albums</span>
      </span>
      <span>|</span>

      <span className="font-semibold flex items-center gap-2">
        <Mic2 className="w-5 h-5" />
        {amountOfSingles}
        <span className="font-normal">Singles</span>
      </span>
      <span>|</span>

      <span className="font-semibold flex items-center gap-2">
        <MusicIcon className="w-5 h-5" />
        {amountOfTracks}
        <span className="font-normal">Tracks</span>
      </span>
    </p>
  );
}
