import { PaginationControls } from "@/app/_components/pagination-controls";
import { getArtistsSearchUseCase } from "@/use-cases/artist";

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

  const { artists, totalPages } = await getArtistsSearchUseCase(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
  );

  return (
    <section className="space-y-20">
      <h1 className="font-bold text-4xl">Artists</h1>

      <ul>
        {artists.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
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
