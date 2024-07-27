"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { LikedItems } from "@/types";
import { ArtistsFavouriteDialog } from "@/components/favs/artists-favourite-dialog";
import { AlbumsFavouriteDialog } from "@/components/favs/albums-favourite-dialog";
import { TracksFavouriteDialog } from "@/components/favs/tracks-favourite-dialog";

type FavouriteMenuProps = {
  likedContent: LikedItems;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeModal?: () => void;
};

export function FavouriteMenu({
  likedContent,
  open,
  onOpenChange,
  closeModal,
}: FavouriteMenuProps) {
  const renderContent = () => {
    switch (likedContent.type) {
      case "artists":
        return (
          <ArtistsFavouriteDialog
            likedArists={likedContent.items}
            closeModal={closeModal}
          />
        );
      case "albums":
        return (
          <AlbumsFavouriteDialog
            likedAlbums={likedContent.items}
            closeModal={closeModal}
          />
        );
      case "tracks":
        return (
          <TracksFavouriteDialog
            likedTracks={likedContent.items}
            closeModal={closeModal}
          />
        );
    }
  };

  return (
    <section className="pt-6">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {!!!open && (
            <Button variant="ghost" className="py-7">
              <CirclePlus className="w-10 h-10" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="p-8">{renderContent()}</DialogContent>
      </Dialog>
    </section>
  );
}
