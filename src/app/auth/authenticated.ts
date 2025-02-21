import { cookies } from "next/headers";

export default async function authenticaed() {
  const isAuth = !!(await cookies()).get('Authentication')?.value
  return isAuth;
}