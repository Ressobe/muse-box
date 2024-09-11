import { Faq } from "@/app/_components/landing-page/faq";
import { Features } from "@/app/_components/landing-page/features";
import { Hero } from "@/app/_components/landing-page/hero";

export default function Home() {
  return (
    <section className="space-y-32 md:space-y-52 py-20">
      <Hero />
      <Features />
      <Faq />
    </section>
  );
}
