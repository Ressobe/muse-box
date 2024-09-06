import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { APP_NAME, APP_SHORT_DESCRIPTION, LOGO } from "@/config";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({ display: "swap", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_SHORT_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={poppins.className}>
      <link rel="icon" href={LOGO} sizes="any" />
      <body className="flex flex-col min-h-screen">
        <NextTopLoader color="#6d28d9" showSpinner={false} />
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
