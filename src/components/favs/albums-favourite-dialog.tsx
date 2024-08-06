"use client";

import Image from "next/image";
import { SelectFavourite } from "@/components/favs/select-favourite";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LikedAlbums } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

type AlbumsFavouriteDialogProps = {
  likedAlbums: LikedAlbums;
  closeModal?: () => void;
};

export function AlbumsFavouriteDialog({
  likedAlbums,
  closeModal,
}: AlbumsFavouriteDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredAlbums = useMemo(
    () =>
      likedAlbums.filter((album) =>
        album.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    [debouncedSearchTerm, likedAlbums],
  );

  return (
    <>
      <div className="p-4">
        <span className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search ..."
            className="pl-10 text-white text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>
      </div>
      <ScrollArea className="h-96">
        <ul className="p-4 space-y-2">
          {filteredAlbums.map((alb) => {
            return (
              <>
                <SelectFavourite
                  key={alb.id}
                  entityId={alb.id}
                  type="album"
                  closeModal={closeModal}
                >
                  <Image
                    src={alb.image ?? ""}
                    width={100}
                    height={100}
                    alt={`${alb.title} image`}
                  />
                  <span className="text-lg">{alb.title}</span>
                </SelectFavourite>
                <Separator />
              </>
            );
          })}
        </ul>
      </ScrollArea>
    </>
  );
}
