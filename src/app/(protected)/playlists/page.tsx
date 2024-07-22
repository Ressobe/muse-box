import { currentUser } from "@/lib/auth";
import { getPlaylistImageUseCase } from "@/use-cases/playlist";
import { getUserPlaylistsUseCase } from "@/use-cases/user";
import Image from "next/image";
import Link from "next/link";

export default async function PlaylistsPage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const playlists = await getUserPlaylistsUseCase(user.id);

  const playlistsWithImages = await Promise.all(
    playlists.map(async (playlist) => ({
      ...playlist,
      image: await getPlaylistImageUseCase(playlist.id),
    })),
  );

  return (
    <section className="space-y-12">
      <h1 className="font-bold text-4xl">Your playlists</h1>
      <ul className="grid">
        {playlistsWithImages.map((playlist) => {
          if (playlist.items.length === 0) {
            return null;
          }
          return (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="transition-all p-4 hover:bg-secondary/40 rounded"
            >
              <li className="flex gap-x-4 items-center">
                <div className="w-[200px] h-[200px] relative overflow-hidden">
                  <Image
                    src={playlist.image ?? ""}
                    alt={`Playlist ${playlist.name} image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="pt-4">
                  <div className="text-lg">{playlist.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {playlist.items.length > 1
                      ? `${playlist.items.length} Items`
                      : `${playlist.items.length} Item`}
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
