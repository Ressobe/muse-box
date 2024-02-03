import { useState, ChangeEvent, FormEvent } from 'react';
import { FormConfig, FormErrors, FormProps, FormValues } from '../types/formTypes';


const useForm = <T extends FormValues>(config: FormConfig<T>) => {
  const {initialState, validate, endpoint} = config;

  const [formData, setFormData] = useState<T>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [serverErrorMessage, setServerError] = useState<string>("");
  const [sucess, setSucess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error for the field when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    const errors = validate(formData);
    setFormErrors(errors);

    // If there are errors, stop form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSucess(true);
      }
      else {
        setSucess(false);
        const errorMessage = await response.text();
        setServerError(`Server error: ${errorMessage}`)
      }

    } catch(error) {
      console.error('Error was encountered while processing the request', error);
      setSucess(false);
      setServerError(`Error was encountered while processing the request ${error}`);
    }

    console.log('Form submitted:', formData);
  };

  return {
    formData,
    formErrors,
    handleChange,
    handleSubmit,
    serverErrorMessage,
    sucess,
  } as FormProps<T>;
};

export default useForm;
