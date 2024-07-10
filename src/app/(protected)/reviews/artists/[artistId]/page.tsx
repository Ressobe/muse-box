import { ArtistHeader } from "@/components/artist-header";
import { Comment } from "@/components/comment";
import { getArtistGenresUseCase, getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";

export default async function ArtistReviewsPage({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;
  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    notFound();
  }
  const genres = await getArtistGenresUseCase(artist.id);

  // TODO: Lazy loading of more reviews

  return (
    <section className="space-y-12">
      <ArtistHeader name={artist.name} genres={genres} />
      <h2 className="font-bold text-4xl">Reviews</h2>
      <div className="w-full grid grid-cols-2 gap-x-10">
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
      </div>
    </section>
  );
}
