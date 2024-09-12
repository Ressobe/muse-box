import { ArrowDownNarrowWide } from "lucide-react";
import Link from "next/link";

type SeeMoreButtonProps = {
  href: string;
};

export function SeeMoreButton({ href }: SeeMoreButtonProps) {
  return (
    <div className="mt-8 flex justify-center">
      <Link
        href={href}
        className="flex items-center gap-2 bg-secondary-foreground  text-sm py-2 md:text-lg px-4 text-background transition-all rounded hover:bg-secondary-foreground/80 active:scale-110"
      >
        <ArrowDownNarrowWide className="w-4 h-4 md:w-6 md:h-6" />
        See more
      </Link>
    </div>
  );
}
