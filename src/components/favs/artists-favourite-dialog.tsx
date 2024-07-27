import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { SelectFavourite } from "./select-favourite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LikedArtists } from "@/types";

type ArtistsFavouriteDialogProps = {
  likedArists: LikedArtists;
  closeModal?: () => void;
};

export function ArtistsFavouriteDialog({
  likedArists,
  closeModal,
}: ArtistsFavouriteDialogProps) {
  return (
    <ScrollArea className="h-96">
      <ul className="p-4 space-y-2">
        {likedArists.map((artist) => {
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
  );
}
