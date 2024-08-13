"use server";

import { getUserById, updateUserImage } from "@/data-access/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function newAvatarAction(
  imgSrc: string,
  userId: string | undefined,
) {
  if (!userId) {
    return { error: "User not found!" };
  }

  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "User not found!" };
  }

  const timestamp = Date.now();
  const fileName = `${timestamp}-${existingUser.id}`;

  const file = dataURLtoFile(imgSrc, fileName);
  uploadNewAvatar(file);

  if (existingUser.image) {
    const splited = existingUser.image.split("/");
    const imgSrc = splited[splited.length - 1];
    removeUserAvatar(imgSrc);
  }

  const r = await updateUserImage(
    existingUser.id,
    `${process.env.NEXT_PUBLIC_AVATARS_URL!}/${fileName}`,
  );
  if (!r) {
    return { error: "Something went wrong!" };
  }

  return {
    success:
      "Your profile picture was updated!, but you need to log out to see new avatar !",
  };
}

function uploadNewAvatar(newAvatar: File) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  supabase.storage.from("Avatars").upload(newAvatar.name, newAvatar);
}

function removeUserAvatar(imgSrc: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  supabase.storage.from("Avatars").remove([`${imgSrc}`]);
}

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
