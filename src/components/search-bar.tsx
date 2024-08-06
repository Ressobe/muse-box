"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

const formSchema = z.object({
  search: z.string().min(1).max(50),
});

export function SearchBar() {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="relative">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <FormControl>
                <Input
                  type="text"
                  placeholder="Search ..."
                  {...field}
                  ref={inputRef}
                  className="pl-10 text-white text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
