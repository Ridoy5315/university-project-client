/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { OTPSchema } from "@/zod/otp.validation";

export const otpVerify = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      email: formData.get("email"),
      otp: formData.get("pin"),
    };

    if (zodValidator(payload, OTPSchema).success === false) {
      return zodValidator(payload, OTPSchema);
    }

    const validatedPayload = zodValidator(payload, OTPSchema).data;

    const res = await serverFetch.post("/otp/verify", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "OTP verification failed"
      }`,
    };
  }
};
