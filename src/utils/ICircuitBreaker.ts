export interface ICircuitBreaker {
  call(action: () => Promise<void>): Promise<void>;
}
