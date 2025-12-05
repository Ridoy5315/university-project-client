"use server"

import { serverFetch } from "@/lib/server-fetch";


export async function getPasswordSuggestion(name: string) {
  if (!name) return null;

  try {
    const res = await serverFetch.get(`/user/password-suggestion?name=${encodeURIComponent(name)}`);

    const data = await res.json();
    console.log(data, "data")
    return data.success ? data.password : null;
  } catch (error) {
    console.error("AI Suggestion Fetch Error:", error);
    return null;
  }
}

