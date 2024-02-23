export default function ArtistAvatar() {
  return (
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
  );
}
