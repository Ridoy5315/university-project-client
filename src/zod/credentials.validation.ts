import { z } from "zod";

export const addCredentialZodSchema = z.object({
  email: z.string().email("Invalid email"),
  label: z.string().min(2, "Label is required"),
  siteName: z.string().min(2, "Site name is required"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  username: z.string().min(2, "Username or email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const updateCredentialSchema = z.object({

  label: z
    .string().min(2, "Label is required")
    .optional(),

  url: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")), // allow empty

  username: z
    .string()
    .min(2, "Username pr email is required")
    .optional(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});
