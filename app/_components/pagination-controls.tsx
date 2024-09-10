"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import clsx from "clsx";

type PaginationControlsProps = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
};

export function PaginationControls({
  hasPrevPage,
  hasNextPage,
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") ?? "1");

  if (page < 1) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }

  if (page > totalPages) {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${totalPages}`);
    replace(`${pathname}?${params.toString()}`);
  }

  function createPrevPageUrl() {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage - 1}`);
    return `${pathname}?${params.toString()}`;
  }

  function createNextPageUrl() {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${currentPage + 1}`);
    return `${pathname}?${params.toString()}`;
  }

  function createSpecificPageUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${page}`);
    return `${pathname}?${params.toString()}`;
  }

  const prevPageUrl = createPrevPageUrl();
  const nextPageUrl = createNextPageUrl();

  const pages = (() => {
    const pages = [];
    const prev = page - 1;
    const next = page + 1;

    if (prev >= 1) {
      pages.push(prev);
    }
    pages.push(page);
    if (next <= totalPages) {
      pages.push(next);
    }
    return pages;
  })();

  return (
    <Pagination>
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious href={prevPageUrl} />
          </PaginationItem>
        )}

        {pages.map((item) => {
          const link = createSpecificPageUrl(item);
          return (
            <PaginationItem
              key={item}
              className={clsx(
                page === item && "bg-secondary rounded-lg",
                "transition-all",
              )}
            >
              <PaginationLink href={link}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages - pages[pages.length - 1] > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext href={nextPageUrl} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
