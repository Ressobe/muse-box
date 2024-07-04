import { options } from "@/types";
import Link from "next/link";

type CommentProps = {
  id: string;
  ownerId: string;
  ownerName: string | null;
  rate: number;
  content: string;
  createdAt: Date;
  profileId?: string;
};

export function Comment({
  ownerId,
  ownerName,
  content,
  rate,
  createdAt,
}: CommentProps) {
  return (
    <div className="pt-10 space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden w-16 h-16">
              <div className="rounded-full w-[60px] h-[60px] border"></div>
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
          <div className="border-b border-muted-foreground pb-4 border-gray-200">
            <p className="pt-4 flex items-center justify-between text-sm">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
