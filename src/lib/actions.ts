'use server'

async function signIn(type: string, formData: FormData) {
  return "hello";
}
 
 
export async function authenticate(formData: FormData) {
  await signIn('credentials', formData);
  // try {
  //   await signIn('credentials', formData)
  // } catch (error) {
  //   if (error) {
  //     switch (error.type) {
  //       case 'CredentialsSignin':
  //         return 'Invalid credentials.'
  //       default:
  //         return 'Something went wrong.'
  //     }
  //   }
  //   throw error
  // }
}
