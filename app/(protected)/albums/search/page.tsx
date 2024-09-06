import { PaginationControls } from "@/components/pagination-controls";
import { RatingStats } from "@/components/review/rating-stats";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAlbumsSearchUseCase } from "@/use-cases/album";
import Image from "next/image";
import Link from "next/link";

type SearchPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

const sortTypes = [
  "alphabetical",
  "alphabeticalReverse",
  "highestRating",
  "lowestRating",
  "default",
] as const;

console.log(`${typeof sortTypes}`);

export type SortType = (typeof sortTypes)[number];

function isValidSortType(value: string | undefined): value is SortType {
  return sortTypes.includes(value as SortType);
}

export default async function AlbumsSearchPage({
  searchParams,
}: SearchPageProps) {
  const page = Number(searchParams["page"] ?? DEFAULT_PAGE);
  const perPage = Number(searchParams["per_page"] ?? DEFAULT_PER_PAGE);
  let sortType: SortType = "default";

  if (isValidSortType(searchParams["sort"])) {
    sortType = searchParams["sort"];
  }

  const { albums, totalPages } = await getAlbumsSearchUseCase(
    page < 1 ? DEFAULT_PAGE : page,
    perPage < 1 ? DEFAULT_PER_PAGE : perPage,
    sortType,
  );

  return (
    <section className=" space-y-20">
      <h1 className="font-bold text-4xl">Albums</h1>
      <section>
        <Table className="w-full min-w-full">
          <TableHeader className="min-w-full">
            <TableRow>
              <TableHead className="w-1/5">Place</TableHead>
              <TableHead className="w-3/5">Album</TableHead>
              <TableHead className="w-1/5">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {albums?.map((item, idx) => {
              const globalIndex = (page - 1) * perPage + idx + 1;

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-bold text-xl">
                    {globalIndex}
                  </TableCell>
                  <TableCell className="flex items-center gap-4">
                    <div className="w-[100px] h-[100px]">
                      <Image
                        src={item.image ?? ""}
                        width={100}
                        height={100}
                        alt={`${item.title} cover image`}
                        className="object-cover"
                      />
                    </div>
                    <Link
                      href={`/albums/${item.id}`}
                      className="hover:underline underline-offset-2"
                    >
                      {item.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <RatingStats stats={item.stats} size="lg" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableCaption className="mt-4 text-center">
            {totalPages > 1 ? (
              <PaginationControls
                hasPrevPage={page > 1}
                hasNextPage={page < totalPages}
                totalPages={totalPages}
                currentPage={page}
              />
            ) : null}
          </TableCaption>
        </Table>
      </section>
    </section>
  );
}
