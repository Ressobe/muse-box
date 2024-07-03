"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { settingsAction } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSucess } from "@/components/form-sucess";
import { FormError } from "@/components/form-error";
import { TailSpin } from "react-loader-spinner";

export default function SettingsPage() {
  const user = useCurrentUser();

  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSucess("");
    startTransition(async () => {
      try {
        const result = await settingsAction({
          ...values,
        });
        if (result.sucess) {
          update();
          setSucess(result.sucess);
        }
        if (result.error) {
          setError(result.error);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    });
  };

  return (
    <Card className="w-2/3 text-left border-none">
      <CardHeader>
        <p className="text-2xl font-semibold">Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Bartek"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false ? (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="email@gmail.com"
                            disabled={isPending}
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
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}
            </div>
            <FormSucess message={sucess} />
            <FormError message={error} />
            <div className="w-full flex flex-row-reverse">
              <Button disabled={isPending} type="submit" className="px-8">
                {isPending ? (
                  <>
                    <TailSpin
                      visible={true}
                      height="25"
                      width="25"
                      color="#6d28d9"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperClass=""
                    />
                  </>
                ) : (
                  <>Save</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
