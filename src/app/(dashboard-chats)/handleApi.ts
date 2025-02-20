"use server";
import { get, post } from "@/utils/fetch";

export async function getModelList(){
  const response = await get("models");
  return response;
}

export async function getStateList(){
  const response = await get("chats");
  return response || {};
}

export async function getChatList(stateId: string){
  const response = await get(`chats/${stateId}`);
  return response || [];
}

export async function postNewState(model: string, question: string){
  const isInit = "true"
  const response = await post(`chats/`, {model, question, isInit})
  return response?.data;
}