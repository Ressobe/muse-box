"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { SignInFormType, signInSchema } from "@/src/types/formTypes"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"

type SignInFormProps = {
  onSuccess: () => void;
}

export function SignInForm({onSuccess}: SignInFormProps) {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = (values: SignInFormType) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
        <FormField
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
