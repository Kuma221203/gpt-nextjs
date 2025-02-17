"use server";

import { FormError } from "@/common/form-error.interface";
import { getErrorMessage } from "@/utils/error";
import { redirect } from "next/navigation"


export default async function createUser(
  _prevState: FormError,
  formData: FormData
) {
  
  const res = await fetch('http://localhost:8080/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  });
  const parsedRes = await res.json();
  if(!res.ok){
    console.log(">> Check error ");
    
    return {error: getErrorMessage(parsedRes)};
  } 
  redirect("/")
}