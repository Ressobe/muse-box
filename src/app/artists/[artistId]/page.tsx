import { getArtist } from "@/src/database/artist";
import getServerProfileSession from "@/src/lib/session";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MusicIcon } from "lucide-react";
import FollowButton from "../follow-button";
import { SubmitButton } from "@/src/components/submit-button";
import { CardContent, Card } from "@/src/components/ui/card";
import ArtistComments from "./comments";
import { ArtistProvider } from "@/src/context/artist-context";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  if (!params.artistId) {
    notFound();
  }
  const profile = await getServerProfileSession();
  const artist = await getArtist(params.artistId, profile?.id);

  // const latestRecordings = await getLatestRecordings(params.artistId, 5);
  // const albums = await getAlbums(params.artistId, 10);

  if (!artist) {
    notFound();
  }

  return (
    <>
      <div className="flex max-w-4xl mx-auto mt-20">
        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <div className="aspect-square rounded-full object-cover border border-gray-200 dark:border-gray-800 h-[200px] width-[200px]"></div>
          <h1 className="font-bold text-4xl">{artist.name}</h1>
          <h2 className="font-medium text-sm text-muted-foreground dark:text-muted-foreground">
            @djbeats
            {artist.about}
          </h2>
          <div className="space-y-4">
            <div className="pt-5 flex items-center gap-3">
              <FollowButton
                artistId={artist.id}
                profileId={profile?.id}
                isFollowed={artist.isFollowed}
                addOptimisticFollower={() => () => {}}
                removeOptimisticFollower={() => () => {}}
              />
              <span className="text-muted-foreground">10303 followers</span>
            </div>
            <div className="flex items-center gap-3">
              <SubmitButton>Rate</SubmitButton>
              <span className="text-muted-foreground">3.4 rate</span>
            </div>
          </div>
        </div>
        <div className="pl-20 flex w-2/3 justify-between items-start  gap-4 ">
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="text-xl font-bold">Poland</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Birthday </p>
              <p className="text-xl font-bold">11.12.2002</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Also Known as </p>
              <p className="text-xl font-bold">Taco, Szef Totalny</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Genres</p>
              <p className="text-xl font-bold">Hip Hop, Rap, Trap</p>
            </div>
          </div>
          <div className="grid gap-2">
            <span className="flex gap-3 items-center">
              <MusicIcon className="w-6 h-6" />
              <Link href="" className="text-xl">
                Spotify
              </Link>
            </span>
            <span className="flex gap-3 items-center">
              <MusicIcon className="w-6 h-6" />
              <Link href="" className="text-xl">
                Youtube
              </Link>
            </span>
            <span className="flex gap-3 items-center">
              <MusicIcon className="w-6 h-6" />
              <Link href="" className="text-xl">
                Soundcloud
              </Link>
            </span>
            <span className="flex gap-3 items-center">
              <MusicIcon className="w-6 h-6" />
              <Link href="" className="text-xl">
                Soundcloud
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-20 space-y-5">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-right text-3xl font-bold">Latest Recordings</h1>
          <span>View All</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8 py-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">Summer Groove</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                A collection of beats to make your summer memorable.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">Summer Groove</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                A collection of beats to make your summer memorable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-20 space-y-5">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-right text-3xl font-bold">Albums</h1>
          <span>View All</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8 py-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">Summer Groove</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                A collection of beats to make your summer memorable.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">Summer Groove</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                A collection of beats to make your summer memorable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-20 space-y-5">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-right text-3xl font-bold">Songs</h1>
          <span>View All</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-8 py-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">Summer Groove</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                A collection of beats to make your summer memorable.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold">Summer Groove</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                A collection of beats to make your summer memorable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <section className="max-w-4xl mx-auto my-20 space-y-5">
        <ArtistProvider artist={artist}>
          <ArtistComments />
        </ArtistProvider>
      </section>
    </>
  );
}
