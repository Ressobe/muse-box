export default async function Album({
  params,
}: {
  params: { artistId: string; albumId: string };
}) {
  return (
    <ul className="flex flex-col gap-4 items-center">
      {/* {songs.map((item) => {
                return (
                    <li>{item.track_number} {item.title}</li>
                );
            })} */}
    </ul>
  );
}
