import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { SelectFavourite } from "@/app/_components/favs/select-favourite";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";
import { LikedArtists } from "@/src/entities/types";
import { Search } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { useMemo, useState } from "react";
import { useDebounce } from "@/app/_hooks/use-debounce";

type ArtistsFavouriteDialogProps = {
  likedArists: LikedArtists;
  closeModal?: () => void;
};

export function ArtistsFavouriteDialog({
  likedArists,
  closeModal,
}: ArtistsFavouriteDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredArtists = useMemo(
    () =>
      likedArists.filter((artist) =>
        artist.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    [debouncedSearchTerm, likedArists],
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
          {filteredArtists.map((artist) => {
            return (
              <>
                <SelectFavourite
                  key={artist.id}
                  entityId={artist.id}
                  type="artist"
                  closeModal={closeModal}
                >
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={artist.image ?? ""} />
                    <AvatarFallback>
                      <FaUser className="w-14 h-14" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-lg">{artist.name}</span>
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
