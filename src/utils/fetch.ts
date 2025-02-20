"use server";

import { cookies } from "next/headers";
import { getErrorMessage } from "./error";

const API_URL = "http://localhost:8080" 

const getHeaders = async () => {
  const cookieStore = await cookies(); 
  return {
    Cookie: cookieStore.toString(),
  };
};

export const post = async (path: string, data: FormData | object) => {
  const headers = await getHeaders(); 
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

export const get = async (
  path: string,
  tags?: string[],
  params?: URLSearchParams
) => {
  const headers = await getHeaders(); 
  const url = params ? `${API_URL}/${path}?` + params : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: { ...headers },
    next: { tags },
  });
  return res.json() ;
};

