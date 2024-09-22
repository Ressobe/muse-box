import { AlbumsCards } from "@/app/_components/album/albums-cards";
import { ArtistsCards } from "@/app/_components/artist/artists-cards";
import { CardsLoading } from "@/app/_components/loading/cards-loading";
import { TracksCards } from "@/app/_components/track/tracks-cards";
import { UsersCards } from "@/app/_components/user/users-cards";
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

  const users = await getFilteredUsersController(query);
  const artists = await getFilteredArtistsController(query);
  const albums = await getFilteredAlbumsController(query);
  const tracks = await getFilteredTracksController(query);

  return (
    <section className="space-y-20">
      <div>
        <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
          Users
        </h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense fallback={<CardsLoading />}>
            <UsersCards users={users} />
          </Suspense>
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
          Artists
        </h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense fallback={<CardsLoading />}>
            <ArtistsCards artists={artists} />
          </Suspense>
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
          Albums
        </h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense fallback={<CardsLoading />}>
            <AlbumsCards albums={albums} />
          </Suspense>
        </ul>
      </div>

      <div>
        <h1 className="font-bold text-2xl md:text-4xl text-center md:text-left">
          Tracks
        </h1>
        <ul className="pl-4 pt-8 flex flex-wrap">
          <Suspense fallback={<CardsLoading />}>
            <TracksCards tracks={tracks} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
}
