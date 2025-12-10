/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getUserInfo } from "@/lib/getUserInfo";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { addCredentialZodSchema } from "@/zod/credentials.validation";

export const addCredential = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  const userInfo = await getUserInfo();
  const user = userInfo?.data;
  console.log(user);

  try {
    const payload = {
      email: user?.email, // user email (required)
      label: formData.get("label"),
      siteName: formData.get("siteName"),
      url: formData.get("url") || "",
      username: formData.get("username"),
      password: formData.get("password"),
    };

    // Validate input
    const validationResult = zodValidator(payload, addCredentialZodSchema);
    if (!validationResult.success) {
      return validationResult;
    }

    const validatedPayload = validationResult.data;

    console.log(validatedPayload, "validatedPayload");

    const res = await serverFetch.post("/credentials/add", {
      body: JSON.stringify(validatedPayload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to add credential");
    }

    return {
      success: true,
      message: "Credential Added Successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to save credential. Please check your inputs and try again.",
    };
  }
};

export const getUserCredentials = async () => {
  const userInfo = await getUserInfo();
  const user = userInfo?.data;
  console.log(user);

  try {
    const res = await serverFetch.get(
      `/credentials/userCredentials?email=${user.email}`
    );

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to retrieve user credentials");
    }

    return {
      success: true,
      message: "Credential Added Successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to save credential. Please check your inputs and try again.",
    };
  }
};
