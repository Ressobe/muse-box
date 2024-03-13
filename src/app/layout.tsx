import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import SessionProvider from "../context/session-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/src/components/ui/toaster";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Muse Box",
  description:
    "A music platform that allow users to rate, share and comment music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/music-box.png" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
