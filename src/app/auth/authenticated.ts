import { cookies } from "next/headers";

export default async function authenticaed() {
  return !!(await cookies()).get('Authentication')?.value;
}