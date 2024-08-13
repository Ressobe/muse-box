import { AlbumCard } from "@/components/album-card";
import { ArtistCard } from "@/components/artist-card";
import { TrackCard } from "@/components/track-card";
import { UserCard } from "@/components/user-card";
import { getFilteredAlbumsUseCase } from "@/use-cases/album";
import { getFilteredArtistsUseCase } from "@/use-cases/artist";
import { getFilteredTracksUseCase } from "@/use-cases/track";
import { getFilteredUsersUseCase } from "@/use-cases/user";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams["query"] ?? "";

  const users = await getFilteredUsersUseCase(query);
  const artists = await getFilteredArtistsUseCase(query);
  const albums = await getFilteredAlbumsUseCase(query);
  const tracks = await getFilteredTracksUseCase(query);

  return (
    <section className="space-y-16">
      <div>
        <h1 className="font-bold text-4xl">Users</h1>
        <ul className="pl-4 pt-8 flex">
          {users.length > 0 ? (
            users.map((item) => {
              return <UserCard key={item.id} user={item} />;
            })
          ) : (
            <span className="pl-4 pt-8 text-lg">No users</span>
          )}
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Artists</h1>
        <ul className="pl-4 pt-8 flex">
          {artists.length > 0 ? (
            artists.map((item) => {
              return <ArtistCard key={item.id} artist={item} />;
            })
          ) : (
            <span className="pl-4 pt-8 text-lg">No artists</span>
          )}
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Albums</h1>
        <ul className="pl-4 pt-8 flex">
          {albums.length > 0 ? (
            albums.map((item) => {
              return <AlbumCard key={item.id} album={item} />;
            })
          ) : (
            <span className="pl-4 pt-8 text-lg">No albums</span>
          )}
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-4xl">Tracks</h1>
        <ul className="pl-4 pt-8 flex">
          {tracks.length > 0 ? (
            tracks.map((item) => {
              return <TrackCard key={item.id} track={item} />;
            })
          ) : (
            <span className="pl-4 pt-8 text-lg">No tracks</span>
          )}
        </ul>
      </div>
    </section>
  );
}
