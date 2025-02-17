import { cookies } from "next/headers";
import { getErrorMessage } from "./error";

const API_URL = "http://localhost:8080" 

const getHeaders = async () => {
  const cookieStore = await cookies(); 
  return {
    Cookie: cookieStore.toString(),
  };
};

export const post = async (path: string, formData: FormData) => {
  const headers = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
};

export const get = async (path: string) => {
  const headers = await getHeaders(); 
  
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...headers },
  });
  return res.json();
};
