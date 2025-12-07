import z from "zod";

export const OTPSchema = z.object({
  email: z
        .string()
        .nonempty({ message: "Email is required" })
        .email({ message: "Valid email is required" })
        .trim(),
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});