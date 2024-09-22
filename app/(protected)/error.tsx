"use client";

import { useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { LOGO } from "@/config";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: send error to database
    console.error(error);
  }, [error]);

  return (
    <section className="h-screen w-full flex flex-col items-center text-center justify-center gap-y-6 px-10">
      <Image src={LOGO} width={220} height={220} alt="musebox-logo" />
      <h1 className="font-bold text-5xl">Something went wrong!</h1>
      <p className="text-sm text-muted-foreground">
        Something went wrong and the developers have been notified!
      </p>
      <div className="flex flex-col md:flex-row gap-6 flex-wrap">
        <Link href="/home">
          <Button>Go to home</Button>
        </Link>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </section>
  );
}
