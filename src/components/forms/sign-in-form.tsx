"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { SignInFormType, signInSchema } from "@/src/types/formTypes"
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { signIn } from "next-auth/react"

type SignInFormProps = {
  onSuccess: () => void;
}

export function SignInForm({onSuccess}: SignInFormProps) {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema)
  });

  const router = useRouter();

  const onSubmit = async (values: SignInFormType) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if(signInData?.error) {
      console.error(signInData.error)
    } else {
      onSuccess();
      router.push("/");
      router.refresh();
      console.log("succes");
    }
  }

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-6">
        <FormField
          control={form.control}
          name="email" 
          render={({field}) => (
              <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                      <Input placeholder="*Your email" {...field} />
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
                <Input type="password" placeholder="*Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          <Button type="submit" className="px-20 rounded">Log in</Button>
        </div>
      </form>
    </Form>
  )
}
