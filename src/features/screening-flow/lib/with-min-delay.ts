export function withMinDelay<T>(task: Promise<T>, minDelayMs: number): Promise<T> {
  const minDelay = new Promise<void>((resolve) => setTimeout(resolve, minDelayMs));
  return Promise.all([task, minDelay]).then(([result]) => result);
}
