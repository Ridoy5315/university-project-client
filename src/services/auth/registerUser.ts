/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";


export const registerUser = async(_currentState: any, formData: any): Promise<any> => {

     try {
          const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        if (zodValidator(payload, registerUserValidationZodSchema).success === false) {
            return zodValidator(payload, registerUserValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserValidationZodSchema).data;
        const registerData = {
          name: validatedPayload.name,
          email: validatedPayload.email,
          password: validatedPayload.password
        }

        const res = await serverFetch.post("/user/create-user", {
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await res.json();

        console.log(result)

        return result;
     } catch (error: any) {

          if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
          
     }

}