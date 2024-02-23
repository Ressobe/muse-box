import { getProfileByProfileId } from "@/src/database/profile";
import { SubmitButton } from "../submit-button";
import { formatTimeDiff } from "@/src/lib/utils";
import Link from "next/link";

type NewInviteProps = {
  reciverId: string;
  senderId: string;
  createdAt: Date;
};

export default async function NewInvite({
  reciverId,
  senderId,
  createdAt,
}: NewInviteProps) {
  const senderProfile = await getProfileByProfileId(senderId);
  if (!senderProfile) {
    return null;
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center w-full">
          <img
            alt="Artist"
            className="object-cover rounded-lg"
            height={50}
            src="/user.png"
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
            }}
            width={50}
          />
          <Link
            href={`/profile/${senderProfile.id}`}
            className="pl-4 pr-2 font-bold cursor-pointer hover:underline"
          >
            {senderProfile.name}
          </Link>
          <span className="text-xm">has invited you to friends!</span>
        </div>
        <form className="flex space-x-2">
          <SubmitButton>Accept</SubmitButton>
          <SubmitButton>Reject</SubmitButton>
        </form>
      </div>
      <div className="flex pt-2">
        <div className="w-[50px]"></div>
        <span className="pl-4 text-sm text-secondary-foreground">
          {formatTimeDiff(createdAt)}
        </span>
      </div>
    </>
  );
}
