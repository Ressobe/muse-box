import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../lib/auth";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <>
        <nav className="flex w-full justify-between  px-4 pt-8 items-center gap-2">
        <Link href="/" className="hover:underline hover:font-bold flex items-center gap-x-2">
          <img src="/music-box.png" className="w-10"  />  MuseBox.com
        </Link>

            {session ? (
                <div className="flex gap-x-2" >
                    <div>{session.user.username}</div>
                    <div>{session.user.image}</div>
                    <SignOutButton />
                </div>
            ) : (
                <div className="flex gap-x-2">
                    <Link className="border border-black px-3 py-2 rounded-lg hover:underline" href="sign-in">Sign In</Link>
                </div>
            )}
    

        </nav>

        <ul className="flex w-full justify-center gap-10 mt-10 border text-xl">
            <Link 
                href="/songs"
                className="cursor-pointer hover:underline hover:font-bold"
            >
                Piosenki
            </Link>

            <Link 
                href="/albums" 
                className="cursor-pointer hover:underline hover:font-bold"
            >
                Albumy
            </Link>
            <Link 
                href="/artists" 
                className="cursor-pointer hover:underline hover:font-bold"
            >
                Artyści
            </Link>
            <Link 
                href="/ranking"
                className="cursor-pointer hover:underline hover:font-bold"
            >
                Rankingi/Top
            </Link>
            <Link href="">Nadchodzące Premiery</Link>
        </ul>

        </>
    );
}

function Bars() {
    return (
        <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    );
}

function Searchbox() {
    return (
        <form className="w-1/2 mx-auto block">   
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." required/>
            </div>
        </form>
    );
}