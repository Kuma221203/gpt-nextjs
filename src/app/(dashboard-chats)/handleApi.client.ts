export function postQuestion(model: string, question: string, isInit: boolean, stateId: string, onMessage: (message: string) => void) {

  return new Promise<void>((resolve, reject) => {
    const eventSource = new EventSource(`http://localhost:8080/chats/stream/${stateId}?model=${model}&question=${encodeURIComponent(question)}&isInit=${isInit}`);
    let prevData = "";
    eventSource.onmessage = (event) => {
      // if (event.data === "[DONE]") {
      //   eventSource.close();
      //   resolve();
      //   return;
      // }
      onMessage(event.data);
    };

    eventSource.onerror = (error) => {
      eventSource.close();
      resolve();
      return;
    };
  });
}
