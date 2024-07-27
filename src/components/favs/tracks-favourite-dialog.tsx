import { SelectFavourite } from "@/components/favs/select-favourite";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { LikedTracks } from "@/types";

type TracksFavouriteDialog = {
  likedTracks: LikedTracks;
  closeModal?: () => void;
};

export function TracksFavouriteDialog({
  likedTracks,
  closeModal,
}: TracksFavouriteDialog) {
  return (
    <ScrollArea className="h-96">
      <ul className="p-4 space-y-2">
        {likedTracks.map((track) => {
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
  );
}
