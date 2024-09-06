import { Button } from "@/components/ui/button";
import { LOGO } from "@/config";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center gap-y-6">
      <Image src={LOGO} width={220} height={220} alt="musebox-logo" />
      <h1 className="font-bold text-5xl">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        We can’t seem to find the page you are looking for.
      </p>
      <Link href="/home">
        <Button>Go to home</Button>
      </Link>
    </section>
  );
}
