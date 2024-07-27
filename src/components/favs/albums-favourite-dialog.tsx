import Image from "next/image";
import { SelectFavourite } from "@/components/favs/select-favourite";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LikedAlbums } from "@/types";

type AlbumsFavouriteDialogProps = {
  likedAlbums: LikedAlbums;
  closeModal?: () => void;
};

export function AlbumsFavouriteDialog({
  likedAlbums,
  closeModal,
}: AlbumsFavouriteDialogProps) {
  return (
    <ScrollArea className="h-96">
      <ul className="p-4 space-y-2">
        {likedAlbums.map((alb) => {
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
  );
}
