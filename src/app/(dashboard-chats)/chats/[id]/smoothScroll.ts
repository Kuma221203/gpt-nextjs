export function smoothScrollToBottom(
  container: HTMLDivElement,  
  target: HTMLDivElement,     
  duration: number = 3000     
) {
  const start = container.scrollTop;
  const end = target.offsetTop;
  const distance = end - start;
  let startTime: number | null = null;

  function animateScroll(currentTime: number) {
    if (startTime === null) {
      startTime = currentTime;
    }
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollTop = start + distance * progress;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

export function scrollToBottomInstant(
  container: HTMLDivElement,
) {
  container.scrollTop = container.scrollHeight;
}