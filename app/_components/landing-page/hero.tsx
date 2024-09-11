import { APP_LONG_DESCRIPTION, APP_NAME, LOGO } from "@/config";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex w-full flex-col md:flex-row items-center justify-between gap-10 text-left">
      <div className="space-y-6 text-center md:text-left">
        <div>
          <span className="text-6xl font-bold tracking-tighter text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {APP_NAME}
          </span>
          <h3 className="text-3xl pt-2 font-bold tracking-tighter ">
            Unleash the Power of Music
          </h3>
        </div>
        <div className="text-lg">
          <p className="max-w-[600px] text-gray-200">{APP_LONG_DESCRIPTION}</p>
          <p className="max-w-[600px] text-gray-200">
            Connect with music lovers, discover new tunes.
          </p>
          <p className="max-w-[600px] text-gray-200">
            Let your voice be heard!
          </p>
        </div>
        <p className="text-xs text-gray-500">
          Sign up to get notified when we launch.
          <span> </span>
          <Link
            className="underline underline-offset-2"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>
        </p>
      </div>
      <Image src={LOGO} width={270} height={270} alt="musebox-logo" />
    </div>
  );
}
