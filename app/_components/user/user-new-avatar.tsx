"use client";

import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { Input } from "@/app/_components/ui/input";
import { FormError } from "@/app/_components/form-error";
import { Button } from "@/app/_components/ui/button";
import { useToast } from "@/app/_components/ui/use-toast";
import { setCanvasPreview } from "@/lib/utils";
import { newAvatarAction } from "@/actions/new-avatar";
import { useSession } from "next-auth/react";

const AllowedFileExtensions = ["jpg", "jpeg", "png", "webp"];
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export function isFileExtensionAllowed(fileName: string) {
  const fileExtension = fileName.split(".").pop()?.toLowerCase();
  if (!fileExtension || !AllowedFileExtensions.includes(fileExtension)) {
    return false;
  }
  return true;
}

type UserNewAvatarProps = {
  authUserId: string;
  closeModal: () => void;
};

export function UserNewAvatar({ authUserId, closeModal }: UserNewAvatarProps) {
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [fileSelected, setFileSelected] = useState<File | undefined>(undefined);
  const [crop, setCrop] = useState<Crop>();
  const [isPending, startTransition] = useTransition();

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasPreviewRef = useRef<HTMLCanvasElement | null>(null);

  const { update } = useSession();
  const { toast } = useToast();

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFileExtensionAllowed(file.name)) {
      toast({
        variant: "destructive",
        title: "Invalid file format. Please upload a valid image file.",
      });
      return;
    }

    setFileSelected(file);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    setCrop(crop);
  };

  const handleClick = async () => {
    startTransition(async () => {
      if (fileSelected && imgRef.current && canvasPreviewRef.current && crop) {
        setCanvasPreview(
          imgRef.current,
          canvasPreviewRef.current,
          convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
        );

        const dataUrl = canvasPreviewRef.current.toDataURL();
        const fileExtension = fileSelected.name.split(".").pop()?.toLowerCase();
        if (!fileExtension || !AllowedFileExtensions.includes(fileExtension)) {
          toast({
            variant: "destructive",
            title: "Invalid file format. Please upload a valid image file.",
          });
          return;
        }

        const result = await newAvatarAction(dataUrl, authUserId);
        if (result.success) {
          update();
          toast({
            variant: "default",
            title: "Success",
            description: result.success,
          });
        }

        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
          });
        }

        closeModal();
      }
    });
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <Input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={onSelectFile}
          className="block border-none w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:hover:cursor-pointer file:text-xs file:bg-muted file:text-foreground hover:file:bg-muted/50 "
        />
      </label>
      <FormError message={error} />
      {imgSrc && (
        <div className="flex flex-col items-center gap-8">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              src={imgSrc}
              ref={imgRef}
              alt="upload"
              style={{ maxHeight: "70vh" }}
              onLoad={handleImageLoad}
            />
          </ReactCrop>
          <Button disabled={isPending} onClick={handleClick}>
            Update avatar
          </Button>
        </div>
      )}
      {crop && (
        <canvas
          ref={canvasPreviewRef}
          className="hidden border border-white w-[150px] h-[150px]"
        />
      )}
    </>
  );
}
