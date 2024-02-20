import db from "@/src/lib/db";

export async function createTrackComment(
  trackId: string,
  creatorId: string,
  rate: number,
  comment: string
) {
  await db.track.update({
    where: { id: trackId },
    data: {
      comments: {
        create: {
          rate: rate,
          content: comment,
          ownerId: creatorId,
          type: "TRACK",
        },
      },
    },
  });
}
