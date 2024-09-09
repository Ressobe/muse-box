import { PaginationControls } from "@/app/_components/pagination-controls";
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

  const { artists, totalPages } = await getArtistsSearchController(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
  );

  return (
    <section className="space-y-20">
      <h1 className="font-bold text-4xl">Artists</h1>

      <ul>
        <Suspense>
          {artists.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </Suspense>
      </ul>

      {totalPages > 1 && (
        <PaginationControls
          hasPrevPage={page > 1}
          hasNextPage={page < totalPages}
          totalPages={totalPages}
          currentPage={page}
        />
      )}
    </section>
  );
}
