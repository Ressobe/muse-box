import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/config";
import Link from "next/link";

export async function Navbar() {
  return (
    <nav className="bg-background flex justify-between items-center p-4 w-full">
      <Link href="/">
        <h1 className="font-bold hidden md:block text-3xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-125 transform transition-all active:scale-110">
          {APP_NAME}
        </h1>
      </Link>
      <LoginButton>
        <Button className="transform transition-all active:scale-110 hover:bg-muted-foreground ">
          Sign in
        </Button>
      </LoginButton>
    </nav>
  );
}
