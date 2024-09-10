import { PaginationControls } from "@/app/_components/pagination-controls";
import { TracksTable } from "@/app/_components/track/tracks-table";
import { currentUser } from "@/lib/auth";
import { isValidSortType, SortType } from "@/src/entities/types";
import { getTracksSearchController } from "@/src/interface-adapters/controllers/track/get-tracks-search.controller";
import { Suspense } from "react";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export default async function TracksSearchPage({
  searchParams,
}: SearchPageProps) {
  const authUser = await currentUser();
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);
  let sortType: SortType = "default";

  if (isValidSortType(searchParams["sort"])) {
    sortType = searchParams["sort"];
  }

  const { tracks, totalPages } = await getTracksSearchController(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
    sortType,
  );

  return (
    <section className="space-y-20">
      <h1 className="font-bold text-4xl">Tracks</h1>

      <Suspense>
        <TracksTable
          tracks={tracks}
          pagination={{ page, perPage, totalPages }}
          userId={authUser?.id}
        />
      </Suspense>
    </section>
  );
}
