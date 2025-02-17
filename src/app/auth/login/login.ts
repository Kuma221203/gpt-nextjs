"use server";

import { FormError } from "@/common/form-error.interface";
import { getErrorMessage } from "@/utils/error";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default async function login(
  _prevState: FormError, 
  formData: FormData
) {
  const res = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
  const parsedRes = await res.json();
  if (!res.ok) return {error: getErrorMessage(parsedRes)};
  await setAuthCookie(res);

  const redirectUrl = formData.get("redirect") as string || "/";
  redirect(redirectUrl);
}


const setAuthCookie = async (response: Response) => {
    const setCookieHeader = response.headers.get("Set-Cookie");
    if (!setCookieHeader) return;

    const token = setCookieHeader.split(";")[0].split("=")[1];
    
    const cookieStore = await cookies(); 
    cookieStore.set("Authentication", token, {
        secure: true,
        httpOnly: true,
        expires: new Date(jwtDecode(token).exp! * 1000),
    });
};
