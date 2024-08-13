import Image, { ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";

export async function ImageWithBlur(props: ImageProps) {
  if (typeof props.src !== "string") {
    return null;
  }
  if (props.src === "") return null;

  const buffer = await fetch(props.src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  if (!buffer.length) return null;

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Image {...props} alt={props.alt} placeholder="blur" blurDataURL={base64} />
  );
}
