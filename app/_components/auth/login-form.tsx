"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/src/entities/models/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { CardWrapper } from "@/app/_components/auth/card-wrapper";
import { FormError } from "@/app/_components/ui/form-error";
import { FormSucess } from "@/app/_components/ui/form-sucess";
import { loginAction } from "@/app/_actions/login";
import Link from "next/link";
import { TailSpin } from "react-loader-spinner";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with diffrent provider"
      : "";
  const callbackUrl = searchParams.get("callbackUrl");
  const guest = searchParams.get("guest");
  const isGuest = Boolean(guest);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: isGuest ? "guest@gmail.com" : "",
      password: isGuest ? "guest123" : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSucess("");

    startTransition(async () => {
      const response = await loginAction(values, callbackUrl);
      setError(response.error);
      setSucess(response.sucess);
    });
  };

  useEffect(() => {
    if (isGuest) {
      startTransition(async () => {
        const response = await loginAction(
          { email: "guest@gmail.com", password: "guest123" },
          callbackUrl,
        );
        setError(response.error);
        setSucess(response.sucess);
      });
    }
  }, [callbackUrl, isGuest]);

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-sm md:text-lg">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-sm md:text-lg">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="********"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    className="px-0 font-normal"
                    asChild
                  >
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSucess message={sucess} />
          <Button
            variant="secondary"
            type="submit"
            className="w-full relative"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <TailSpin
                  visible={true}
                  height="25"
                  width="25"
                  color="#6d28d9"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperClass="absolute left-[2rem]"
                />
                Login
              </>
            ) : (
              <>Login</>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
