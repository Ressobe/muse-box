'use client'

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()} className="bg-red-100 px-20 py-2 rounded text-black" type="submit">Sign out</button>
  )
}
