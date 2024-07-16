import { options } from "@/types";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";

type CommentProps = {
  review: {
    id: string;
    userId: string;
    entityId: string;
    rating: number;
    comment: string | null;
    createdAt: Date | null;
    user: {
      image: string | null;
      id: string;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      password: string | null;
    };
  };
};

export function Comment({ review }: CommentProps) {
  const { user } = review;
  return (
    <div className="pt-10 space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <UserAvatar avatarUrl={user.image} />
            <div className="space-y-1">
              <Link
                href={`/profiles/${review.userId}`}
                className="text-xl font-bold leading-none hover:underline"
              >
                {user.name}
              </Link>
              <p className=" space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <span>Posted on </span>
                  {review.createdAt?.toLocaleDateString("en-US", options)}
                </span>
                <span>Rate: {review.rating}</span>
              </p>
            </div>
          </div>
          <div className="border-b border-muted-foreground pb-4 border-gray-200">
            <p className="pt-4 flex items-center justify-between text-sm">
              {review.comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
