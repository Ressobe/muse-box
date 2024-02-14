'use client'

import { useState } from "react";
import { SignUpForm } from "./forms/sign-up-form";
import { SignInForm } from "./forms/sign-in-form";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

export default function SignInButton() {
    const [form, setForm] = useState<'sign-in' | 'sign-up'>('sign-in');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setForm('sign-in');
        setOpen(false);
    };

    const handleClick = () => {
        if (form === 'sign-in') {
            setForm('sign-up');
            return;
        }
        setForm('sign-in');
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger >
            <button className="bg-foreground flex items-center justify-center gap-3 text-background px-6 py-2 rounded-lg hover:text-accent ">
                Sign In
            </button>
        </DialogTrigger>
        <DialogContent>
         {form === "sign-in" ? (
            <>
                <SignInForm onSuccess={handleClose} />
                <div className="flex gap-4 justify-center">Don't have an account?
                <button onClick={handleClick} className="underline">Create account</button></div>
            </>
         ) : (
            <>
                <SignUpForm onSuccess={handleClose} />
                <div className="flex gap-4 justify-center">Have an account?
                <button onClick={handleClick} className="underline">Log In</button></div>
            </>
         )}
        </DialogContent>
      </Dialog>
    );
}