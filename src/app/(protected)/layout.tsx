import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <section className="w-full">
        <Topbar />
        <div className="flex">{children}</div>
      </section>
    </div>
  );
}
