import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="w-full max-w-3xl mx-auto py-12 md:py-24 px-4 md:px-6">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Get in Touch
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto">
          Have a question or want to work together? Fill out the form below and
          we will get back to you as soon as possible.
        </p>
      </div>
      <form className="mt-12 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            className="min-h-[150px]"
            id="message"
            placeholder="Enter your message"
          />
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
}
