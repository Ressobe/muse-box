import { ChangeEvent, FormEvent } from 'react';
import { z } from "zod"

export type FormValues = {
  [key: string]: string;
};


export type FormErrors = {
  [key: string]: string;
};


export type FormProps<T> = {
  formData: T;
  formErrors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  serverErrorMessage: string;
  sucess: boolean;
};


export type FormConfig<T> = {
  initialState: T;
  validate: (data: FormValues) => FormErrors;
  endpoint: string;
}

export const signUpSchema = z.object({
  email: z.string().min(1,'Email is required').email({
    message: "Email is not valid"
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }).max(100, {
    message: "Password is too long."
  }),
  confirmPassword: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match'
});

export type SignUpFormType =  z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email is not valid"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }).max(100, {
    message: "Password is too long."
  }),
});

export type SignInFormType =  z.infer<typeof signInSchema>;