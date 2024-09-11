"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/ui/form";
import { Search, X } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { useRef } from "react";
import { Button } from "@/app/_components/ui/button";

const formSchema = z.object({
  search: z.string().min(1).max(50),
});

type SearchBarProps = {
  isOpen: boolean;
  toggleSearch: () => void;
};

export function SearchBar({ isOpen, toggleSearch }: SearchBarProps) {
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams();
    params.set("query", values.search);
    replace(`/search?${params.toString()}`);
    inputRef.current?.blur();
  }

  return (
    <section>
      {isOpen ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="relative space-y-0">
                  <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Search ..."
                      {...field}
                      ref={inputRef}
                      className="pl-10 text-white text-md sm:w-[300px] md:w-[300px] lg:w-[300px]"
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-2.5 top-2.5 h-5 w-5"
                    onClick={toggleSearch}
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <Button variant="ghost" onClick={toggleSearch} className="p-2">
          <Search className="h-6 w-6 text-muted-foreground" />
        </Button>
      )}
    </section>
  );
}
