"use server";

import { BACKEND_URL } from "@/common/constant/const";
import { FormError } from "@/common/form-error.interface";
import { getErrorMessage } from "@/utils/error";
import { redirect } from "next/navigation"


export default async function signup(
  _prevState: FormError,
  formData: FormData
) {
  
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  });
  const parsedRes = await res.json();
  if(!res.ok){
    return {error: getErrorMessage(parsedRes)};
  } 
  redirect("/")
}