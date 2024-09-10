"use client";

import { SelectFavourite } from "@/app/_components/favs/select-favourite";
import Image from "next/image";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";
import { LikedTracks } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { useDebounce } from "@/app/_hooks/use-debounce";
import { useMemo, useState } from "react";

type TracksFavouriteDialog = {
  likedTracks: LikedTracks;
  closeModal?: () => void;
};

export function TracksFavouriteDialog({
  likedTracks,
  closeModal,
}: TracksFavouriteDialog) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredTracks = useMemo(
    () =>
      likedTracks.filter((track) =>
        track.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    [debouncedSearchTerm, likedTracks],
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
          {filteredTracks.map((track) => {
            return (
              <>
                <SelectFavourite
                  key={track.id}
                  entityId={track.id}
                  type="track"
                  closeModal={closeModal}
                >
                  <Image
                    src={track.album.image ?? ""}
                    width={100}
                    height={100}
                    alt={`${track.title} image`}
                  />
                  <span className="text-lg">{track.title}</span>
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
