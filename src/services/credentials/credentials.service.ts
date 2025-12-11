/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getUserInfo } from "@/lib/getUserInfo";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  addCredentialZodSchema,
  updateCredentialSchema,
} from "@/zod/credentials.validation";
import { revalidateTag } from "next/cache";

export const addCredential = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  const userInfo = await getUserInfo();
  const user = userInfo?.data;

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

    if(result.success){
      revalidateTag("credential-list", "default")
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

  try {
    const res = await serverFetch.get(
      `/credentials/userCredentials?email=${user.email}`, {
        cache: "force-cache",
        next: {tags: ["credential-list"]}
      }
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

export async function updateUserCredential(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload = {
    label: formData.get("label") as string,
    url: formData.get("url") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const validationResult = zodValidator(
    validationPayload,
    updateCredentialSchema
  );

  if (!validationResult.success) {
    return validationResult;
  }

  const validatedPayload = validationResult.data;

  try {
    const response = await serverFetch.patch(`/credentials/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to update credential");
    }

    if(result.success){
      revalidateTag("credential-list", "default")
    }

    return {
      success: true,
      message: "Credential updated Successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
      formData: validationPayload,
    };
  }
}
