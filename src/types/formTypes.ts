import { ChangeEvent, FormEvent } from 'react';


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
