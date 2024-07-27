"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CircleCheck, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Entity, LikedItems } from "@/types";
import { FavouriteMenu } from "./favourite-menu";
import { removeFavouriteAction } from "@/actions/favourites";
import { useToast } from "../ui/use-toast";
import { capitalizeFirstLetter } from "@/lib/utils";

type ActionFavouriteMenuProps = {
  className?: string;
  likedContent: LikedItems;
  type: Entity;
};

export function ActionFavouriteMenu({
  className,
  likedContent,
  type,
}: ActionFavouriteMenuProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const { toast } = useToast();

  const handleEditButtonClick = () => {
    setShowDialog(true);
  };

  const handleDeleteButtonClick = async () => {
    await removeFavouriteAction(type);
    setShowPopover(false);
    toast({
      description: (
        <div className="flex items-center">
          <CircleCheck className="mr-2 text-green-500" />
          {`Deleted favourite ${capitalizeFirstLetter(type)}`}
        </div>
      ),
      className: "bg-secondary opacity-90",
      duration: 1000,
    });
  };

  return (
    <section className={className}>
      <Popover open={showPopover} onOpenChange={setShowPopover}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="p-2">
            <EllipsisVertical />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-32 flex flex-col gap-y-3 items-center text-center  ">
          <Button
            variant="ghost"
            onClick={handleEditButtonClick}
            className="p-0 w-full flex items-center justify-center gap-x-3"
          >
            <Pencil className="w-6 h-6" /> <span>Edit</span>
          </Button>

          <Button
            variant="ghost"
            className="p-0 w-full flex items-center justify-center gap-x-3"
            onClick={handleDeleteButtonClick}
          >
            <Trash className="w-6 h-6" /> <span>Delete</span>
          </Button>
        </PopoverContent>
      </Popover>
      {showDialog && (
        <FavouriteMenu
          likedContent={likedContent}
          open={showDialog}
          onOpenChange={setShowDialog}
          closeModal={() => setShowDialog(false)}
        />
      )}
    </section>
  );
}
