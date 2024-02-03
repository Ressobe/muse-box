'use client'

import useForm from "@/src/hooks/useForm";
import { FormValues, FormErrors } from "@/src/types/formTypes";


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

  if (data.password.length < 8) {
    errors.password = 'Password must have more than 8 characters';
  }

  if (data.password.length > 100) {
    errors.password = 'Password is too long';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Password do not match';
  }

  return errors;
}

const initialState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}

const endpoint = "api/user/sign-up";

const config = {
  initialState,
  validate,
  endpoint,
}

export default function SignUp() {
  const { formData, formErrors, handleChange, handleSubmit, serverErrorMessage, sucess } = useForm<FormValues>(config);

  return (
    <form onSubmit={handleSubmit} method="POST" className="flex flex-col justify-center items-center gap-10 pt-10">
      <input 
        className="appearance-none border rounded py-2 px-3 focus:outline-none" 
        type="email" 
        name="email" 
        value={formData.email}
        onChange={handleChange}
        placeholder="Email" 
      />
      {formErrors.email ? <div className="error">{formErrors.email}</div> : ""}
      <input 
        className="appearance-none border rounded py-2 px-3 focus:outline-none" 
        type="text" 
        name="username" 
        value={formData.username}
        onChange={handleChange}
        placeholder="Username" 
      />        
      {formErrors.username ? <div className="error">{formErrors.username}</div> : ""}
      <input 
        className="appearance-none border rounded py-2 px-3 focus:outline-none" 
        type="password" 
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password" 
      />
      {formErrors.password ? <div className="error">{formErrors.password}</div> : ""}
      <input 
        className="appearance-none border rounded py-2 px-3 focus:outline-none" 
        type="password" 
        name="confirmPassword" 
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password" 
      />
      {formErrors.confirmPassword ? <div className="error">{formErrors.confirmPassword}</div> : ""}
      <button className="bg-black px-20 py-2 rounded text-white" type="submit">Sign up</button>
      { sucess ? <h1>form submited sucessful</h1> : ""}
      { serverErrorMessage ? <h1>{serverErrorMessage}</h1> : ""}
    </form>
  );
}
