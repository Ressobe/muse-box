import { AlbumCard } from "@/app/_components/album/album-card";
import { ArtistCard } from "@/app/_components/artist/artist-card";
import { TrackCard } from "@/app/_components/track/track-card";
import { UserCard } from "@/app/_components/user/user-card";
import { getFilteredAlbumsController } from "@/src/interface-adapters/controllers/album/get-filtered-albums.controller";
import { getFilteredArtistsController } from "@/src/interface-adapters/controllers/artist/get-filtered-artists.controller";
import { getFilteredTracksController } from "@/src/interface-adapters/controllers/track/get-filtered-tracks.controller";
import { getFilteredUsersController } from "@/src/interface-adapters/controllers/user/get-filtered-users.controller";
import { Suspense } from "react";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams["query"] ?? "";

  const usersData = getFilteredUsersController(query);
  const artistsData = getFilteredArtistsController(query);
  const albumsData = getFilteredAlbumsController(query);
  const tracksData = getFilteredTracksController(query);

  const [users, artists, albums, tracks] = await Promise.all([
    usersData,
    artistsData,
    albumsData,
    tracksData,
  ]);

  // TODO: add loading states for data

  return (
    <section className="space-y-20">
      <div>
        <h1 className="font-bold text-4xl">Users</h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense>
            {users.length > 0 ? (
              users.map((item) => {
                return <UserCard key={item.id} user={item} />;
              })
            ) : (
              <span className="pl-4 pt-8 text-lg">No users</span>
            )}
          </Suspense>
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Artists</h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense>
            {artists.length > 0 ? (
              artists.map((item) => {
                return <ArtistCard key={item.id} artist={item} />;
              })
            ) : (
              <span className="pl-4 pt-8 text-lg">No artists</span>
            )}
          </Suspense>
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Albums</h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense>
            {albums.length > 0 ? (
              albums.map((item) => {
                return <AlbumCard key={item.id} album={item} />;
              })
            ) : (
              <span className="pl-4 pt-8 text-lg">No albums</span>
            )}
          </Suspense>
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Tracks</h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense>
            {tracks.length > 0 ? (
              tracks.map((item) => {
                return <TrackCard key={item.id} track={item} />;
              })
            ) : (
              <span className="pl-4 pt-8 text-lg">No tracks</span>
            )}
          </Suspense>
        </ul>
      </div>
    </section>
  );
}
