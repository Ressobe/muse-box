'use client'

import useForm from "@/src/hooks/useForm";
import { FormValues, FormErrors } from "@/src/types/formTypes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";


const validate = (data: FormValues) : FormErrors => {
  const errors: FormErrors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  }

  if (!data.username) {
    errors.username = 'Username is required';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

const initialState = {
  email: '',
  password: '',
}

const endpoint = "api/user/sign-up";

const config = {
  initialState,
  validate,
  endpoint,
}

export default function SignIn() {
  const router = useRouter();
  const { formData, formErrors, handleChange, serverErrorMessage } = useForm<FormValues>(config);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signInData = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if(signInData?.error) {
      console.error(signInData.error)
    } else {
      router.refresh();
      router.push("/");
      console.log(signInData);
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-10 pt-10">
      <input 
        className="appearance-none border rounded py-2 px-3 focus:outline-none" 
        type="email" 
        name="email" 
        value={formData.email}
        onChange={handleChange}
        placeholder="Email" 
        required 
      />
      {formErrors.email ? <div className="error">{formErrors.email}</div> : ""}
      <input 
        className="appearance-none border rounded py-2 px-3 focus:outline-none" 
        type="password" 
        name="password" 
        value={formData.password}
        onChange={handleChange}
        placeholder="Password" 
        required 
      />
      {formErrors.password ? <div className="error">{formErrors.password}</div> : ""}
      <button className="bg-black px-20 py-2 rounded text-white" type="submit">Sign in</button>
      {serverErrorMessage ? <div className="error">{serverErrorMessage}</div> : ""}
    </form>
  );
}
