import { Button } from "@/src/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/src/components/ui/card";
import { getAllArtists } from "@/src/database/artist";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import ArtistInfo from "./artist-info";
import ArtistStats from "./artist-stats";
import FollowButton from "./follow-button";
import { getProfile } from "@/src/database/profile";
import ArtistCard from "./artist-card";

export const dynamic = "force-dynamic";

export default async function Artists() {
  const session = await getServerSession(authOptions);
  const profile = await getProfile(session?.user.userid);
  const artists = await getAllArtists(30, profile?.id);

  return (
    <div className="max-w-5xl flex flex-col mt-10 mx-auto px-4  gap-6">
      {artists.map((artist) => {
        return (
          <Card key={artist.id} className="grid sm:grid-cols-[200px_1fr] py-4">
            <div className="flex items-center justify-center p-6">
              <img
                alt="Artist"
                className="object-cover rounded-lg"
                height={200}
                src="/user.png"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width={200}
              />
            </div>

            <CardContent className="flex flex-col justify-center gap-2">
              <CardTitle className="text-2xl">
                <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
              </CardTitle>
              <CardDescription className="text-sm">
                {artist.about}
              </CardDescription>
              <ArtistCard artist={artist} profileId={profile?.id} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
