import getServerProfileSession from "@/src/lib/session";
import AddComment from "./add-comment";
import { getArtist } from "@/src/database/artist";
import Link from "next/link";
import { options } from "@/src/types/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { FlagIcon, GripVertical, PencilIcon, TrashIcon } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

type ArtistCommentsProps = {
  artistId: string;
};

export default async function ArtistComments({
  artistId,
}: ArtistCommentsProps) {
  const profile = await getServerProfileSession();
  const artist = await getArtist(artistId, profile?.id);

  if (!artist) {
    return null;
  }
  if (!artist.comments) {
    return null;
  }

  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <h2 className="text-3xl font-extrabold tracking-tight">Comments</h2>
      <div className="space-y-5">
        {artist.comments.map((item) => {
          return <Comment key={item.id} {...item} profileId={profile?.id} />;
        })}
        {!artist.isCommented ? (
          <AddComment artistId={artistId} profileId={profile?.id} />
        ) : null}
      </div>
    </div>
  );
}

type CommentProps = {
  ownerId: string;
  ownerName: string | null;
  rate: number;
  content: string;
  createdAt: Date;
  profileId?: string;
};

function Comment({
  ownerId,
  ownerName,
  content,
  rate,
  createdAt,
  profileId,
}: CommentProps) {
  return (
    <div className="pt-10 space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden w-10 h-10">
              <div
                className="rounded-full w-[40px] h-[40px] border"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
              ></div>
            </div>
            <div className="space-y-1">
              <Link
                href={`/profile/${ownerId}`}
                className="text-xl font-bold leading-none hover:underline"
              >
                {ownerName}
              </Link>
              <p className=" space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <span>Posted on </span>
                  {createdAt.toLocaleDateString("en-US", options)}
                </span>
                <span>Rate: {rate}</span>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800">
            <div className="pt-4 flex items-center justify-between">
              <p>{content}</p>
              {ownerId === profileId ? (
                <EditCommentPopover />
              ) : (
                <ReportCommentPopover />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditCommentPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <GripVertical />
      </PopoverTrigger>
      <PopoverContent className="w-fit absolute text-sm">
        <div className="space-y-4">
          <button className="flex w-full items-center gap-x-4 pl-2 py-2 pr-12 rounded hover:bg-zinc-700">
            <PencilIcon className="w-5 h-5" /> Edit
          </button>
          <button className="flex w-full items-center gap-x-4 pl-2 py-2 pr-12 rounded hover:bg-zinc-700">
            <TrashIcon className="w-5 h-5" /> Delete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ReportCommentPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <GripVertical />
      </PopoverTrigger>
      <PopoverContent className="w-fit absolute text-sm">
        <button className="flex w-full items-center gap-x-4 pl-2 py-2 pr-12 rounded hover:bg-zinc-700">
          <FlagIcon className="w-5 h-5" /> Report
        </button>
      </PopoverContent>
    </Popover>
  );
}
