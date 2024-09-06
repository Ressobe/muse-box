import { PaginationControls } from "@/components/pagination-controls";
import { getTracksSearchUseCase } from "@/use-cases/track";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const SORT_TYPE = {
  DEFAULT: "default",
  TITLE_ASC: "title_asc",
  TITLE_DESC: "title_desc",
  RATING_DESC: "rating_desc",
  RATING_ASC: "rating_asc",
} as const;

type ObjectValues<T> = T[keyof T];
type Sort = ObjectValues<typeof SORT_TYPE>;

export default async function TracksSearchPage({
  searchParams,
}: SearchPageProps) {
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);
  const sort = searchParams["sort"] ?? "default";

  const { tracks, totalPages } = await getTracksSearchUseCase(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
  );

  return (
    <section className="space-y-20">
      <h1 className="font-bold text-4xl">Tracks</h1>

      <ul>
        {tracks.map((item) => {
          return <li key={item.id}>{item.title}</li>;
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
