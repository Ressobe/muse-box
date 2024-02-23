import { createArtistComment, getArtist } from "@/src/database/artist";
import { getAlbums, getLatestRecordings } from "@/src/database/recording";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const artist = await getArtist(params.artistId);
  const latestRecordings = await getLatestRecordings(params.artistId, 5);
  const albums = await getAlbums(params.artistId, 10);

  if (!artist) {
    return null;
  }

  async function addComment(formData: FormData) {
    "use server";
    console.log(formData.get("rate"));
    const com = formData.get("comment") as string;
    await createArtistComment(params.artistId, 3, com);
  }

  return (
    <div className="max-w-5xl flex justify-center gap-x-20 mt-10 mx-auto px-4  gap-6">
      <div className="">
        <div>
          Birthday: {artist.begin_date_day}.{artist.begin_date_month}.
          {artist.begin_date_year}
        </div>
        <div>Gender: {artist.gender} </div>
        <div>Age: </div>
        <div></div>
        <div>
          Genres:
          {artist.genres.map((item) => (
            <span>{item.name}</span>
          ))}
        </div>
        <div>
          Tags:
          {artist.tags.map((item) => (
            <span>{item.name}</span>
          ))}
        </div>
      </div>
      <section>
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
        <h1 className="font-bold text-5xl text-center">{artist.name}</h1>
        <div className="pt-10">
          <h2>Latest Releases</h2>
          <section>
            {latestRecordings.map((rec) => {
              return <div key={rec.id}>{rec.name}</div>;
            })}
          </section>
          <h2>Albums</h2>
          <section>
            {albums.map((alb) => {
              return <div key={alb.id}>{alb.name}</div>;
            })}
          </section>
          <h2>Tracks</h2>
        </div>

        <div className="my-20">
          <ul>
            {artist.comments.map((com) => {
              return (
                <li>
                  <span>{com.rate}</span>
                  <span>{com.content}</span>
                </li>
              );
            })}
          </ul>
          <form action={addComment} className="pt-10 flex flex-col">
            <div className="flex gap-4 pb-2">
              <input type="radio" name="rate" />
              <input type="radio" name="rate" />
              <input type="radio" name="rate" />
              <input type="radio" name="rate" />
              <input type="radio" name="rate" />
            </div>
            <textarea name="comment" className="text-background" />
            <button>send comment</button>
          </form>
        </div>
      </section>
      <div className="">
        <ul>
          <li>Spotify</li>
          <li>Instagram</li>
          <li>Facebook</li>
        </ul>
      </div>
    </div>
  );
}
