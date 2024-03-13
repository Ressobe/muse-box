import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/src/components/ui/card";
import Link from "next/link";
import ArtistCard from "./artist-card";
import ArtistAvatar from "./artist-avatar";
import { getAllArtists } from "@/src/database/artist";
import getServerProfileSession from "@/src/lib/session";
import { ArtistProvider } from "@/src/context/artist-context";

export const dynamic = "force-dynamic";

export default async function Artists() {
  const profile = await getServerProfileSession();
  const artists = await getAllArtists(30, profile?.id);

  return (
    <div className="max-w-5xl flex flex-col mt-10 mx-auto px-4 gap-6">
      {artists.map((artist) => {
        return (
          <Card key={artist.id} className="grid sm:grid-cols-[200px_1fr] py-4">
            <ArtistAvatar />
            <CardContent className="flex flex-col justify-center gap-2">
              <CardTitle className="text-2xl">
                <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
              </CardTitle>
              <CardDescription className="text-sm">
                {artist.about}
              </CardDescription>
              <ArtistProvider artist={artist}>
                <ArtistCard profileId={profile?.id} />
              </ArtistProvider>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
