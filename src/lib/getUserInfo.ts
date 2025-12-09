/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "@/services/auth/tokenHandlers";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { serverFetch } from "./server-fetch";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async () => {
     let userInfo: UserInfo | any;
  try {
     const response = await serverFetch.get("/user/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })
        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

             jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

          return result
        }
  } catch (error) {
     console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
        };
  }
}