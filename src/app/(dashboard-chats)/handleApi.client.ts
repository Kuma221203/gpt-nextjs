export function postQuestion(model: string, question: string, isInit: boolean, stateId: string, onMessage: (message: string) => void) {

  return new Promise<void>((resolve) => {
    const eventSource = new EventSource(`http://localhost:8080/chats/stream/${stateId}?model=${model}&question=${encodeURIComponent(question)}&isInit=${isInit}`);
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
