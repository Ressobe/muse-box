import { AlbumPlaylistItem } from "@/app/_components/playlist/album-playlist-item";
import { ArtistPlaylistItem } from "@/app/_components/playlist/artist-playlist-item";
import { TrackPlaylistItem } from "@/app/_components/playlist/track-playlist-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  getPlaylistTypeUseCase,
  getPlaylistUseCase,
} from "@/use-cases/playlist";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PlaylistPage({
  params,
}: {
  params: {
    playlistId: string;
  };
}) {
  const { playlistId } = params;

  const playlist = await getPlaylistUseCase(playlistId);

  if (!playlist) {
    notFound();
  }

  const playlistType = await getPlaylistTypeUseCase(playlist.id);

  return (
    <section className="space-y-20">
      <h2 className="font-bold text-4xl">{playlist.name}</h2>
      {playlistType === "album" && (
        <>
          {playlist.items.map((album) => {
            return <AlbumPlaylistItem key={album.id} albumId={album.itemId} />;
          })}
        </>
      )}
      {playlistType === "artist" && (
        <>
          {playlist.items.map((artist) => {
            return (
              <ArtistPlaylistItem key={artist.id} artistId={artist.itemId} />
            );
          })}
        </>
      )}
      {playlistType === "track" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Album</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlist.items.map((track, index) => {
              return (
                <TrackPlaylistItem
                  key={track.id}
                  trackId={track.itemId}
                  position={index + 1}
                />
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
