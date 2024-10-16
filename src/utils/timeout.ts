export function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), ms),
  );
  return Promise.race([promise, timeout]);
}
