import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import SignOutButton from "../components/SignOutButton";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div> 
        { session?.user ? ( <SignOutButton/>  ) : 
        <Link href="/sign-in">
          <button className="bg-black px-20 py-2 rounded text-white">Sign in</button> 
        </Link>
      }
        <button></button>
        <div >hello from home {session?.user.username}</div>
    </div>
  )
}
