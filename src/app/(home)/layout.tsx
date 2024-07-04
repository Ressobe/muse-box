import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="w-full flex-grow flex flex-col items-center justify-center">
        <section className="px-20">{children}</section>
      </main>
      <Footer />
    </>
  );
}
