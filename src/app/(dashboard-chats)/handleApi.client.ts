import { BACKEND_URL } from "@/common/constant/const";

export function postQuestion(model: string, question: string, isInit: boolean, stateId: string, onMessage: (message: string) => void) {

  return new Promise<void>((resolve) => {
    const eventSource = new EventSource(`${BACKEND_URL}/chats/stream/${stateId}?model=${model}&question=${encodeURIComponent(question)}&isInit=${isInit}`);
    eventSource.onmessage = (event) => {
      onMessage(event.data);
    };
    eventSource.onerror = () => {
      eventSource.close();
      resolve();
      return;
    };
  });
}
