import { AlbumsTable } from "@/app/_components/album/albums-table";
import { PaginationControls } from "@/app/_components/pagination-controls";
import { RatingStats } from "@/app/_components/review/rating-stats";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { isValidSortType, SortType } from "@/src/entities/types";
import { getAlbumsSearchController } from "@/src/interface-adapters/controllers/album/get-albums-search.controller";
import Image from "next/image";
import Link from "next/link";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export default async function AlbumsSearchPage({
  searchParams,
}: SearchPageProps) {
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);
  let sortType: SortType = "default";

  if (isValidSortType(searchParams["sort"])) {
    sortType = searchParams["sort"];
  }

  const { albums, totalPages } = await getAlbumsSearchController(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
    sortType,
  );

  return (
    <section className=" space-y-20">
      <h1 className="font-bold text-4xl">Albums</h1>
      <section>
        <AlbumsTable
          albums={albums}
          pagination={{ page, perPage, totalPages }}
          showContentInteraction={false}
        />
      </section>
    </section>
  );
}
