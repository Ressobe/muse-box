import { Poppins } from "next/font/google";
import { cn } from "@/app/_lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type HeaderProps = {
  heading: string;
  label: string;
};

export function Header({ label, heading }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1
        className={cn(
          "text-3xl font-semibold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          font.className,
        )}
      >
        {heading}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
