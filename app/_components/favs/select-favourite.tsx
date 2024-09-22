"use client";

import { selectFavouriteAction } from "@/app/_actions/favourites";
import { useToast } from "@/app/_components/ui/use-toast";
import { capitalizeFirstLetter } from "@/app/_lib/utils";
import { Content } from "@/src/entities/models/content";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { useTransition } from "react";
import clsx from "clsx";

type SelectFavouriteProps = {
  entityId: string;
  type: Content;
  children?: React.ReactNode;
  closeModal?: () => void;
};

export function SelectFavourite({
  entityId,
  type,
  children,
  closeModal,
}: SelectFavouriteProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleClick = async () => {
    startTransition(async () => {
      await selectFavouriteAction(entityId, type);

      toast({
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2 text-green-500" />
            {`New favourite ${capitalizeFirstLetter(type)}`}
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1000,
      });
      if (closeModal) {
        closeModal();
      }
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "w-full flex flex-col sm:flex-row  items-center gap-4 sm:gap-8 hover:bg-secondary/80 rounded transition-all p-2",
        isPending && "opacity-50",
      )}
      disabled={isPending}
    >
      {isPending ? (
        <TailSpin
          visible={true}
          height="60"
          width="60"
          color="#6d28d9"
          ariaLabel="tail-spin-loading"
          radius="0.5"
          wrapperClass="absolute left-1/2"
        />
      ) : null}

      {children}
    </button>
  );
}
