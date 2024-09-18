import { ArtistsTable } from "@/app/_components/artist/artists-table";
import { isValidSortType, SortType } from "@/src/entities/types";
import { getArtistsSearchController } from "@/src/interface-adapters/controllers/artist/get-artists-search.controller";
import { Suspense } from "react";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export default async function ArtistsSearchPage({
  searchParams,
}: SearchPageProps) {
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);
  let sortType: SortType = "default";

  if (isValidSortType(searchParams["sort"])) {
    sortType = searchParams["sort"];
  }

  const { artists, totalPages } = await getArtistsSearchController(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
    sortType,
  );

  return (
    <section className="space-y-20">
      <h1 className="font-bold text-4xl">Artists</h1>
      <Suspense>
        <ArtistsTable
          artists={artists}
          showContentInteraction={false}
          pagination={{ page, perPage, totalPages }}
        />
      </Suspense>
    </section>
  );
}
