"use client";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams() ;
  return <p className="flex justify-center">ID: {params.id}</p>;
}
