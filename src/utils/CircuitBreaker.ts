import { timeoutPromise } from './timeout';
import { ICircuitBreaker } from './ICircuitBreaker';

export interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
}

export class CircuitBreaker implements ICircuitBreaker {
  private failureCount: number = 0;
  private successCount: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private readonly failureThreshold: number;
  private readonly successThreshold: number;
  private readonly timeout: number;
  private nextAttempt: number = Date.now();

  constructor(config: CircuitBreakerConfig) {
    this.failureThreshold = config.failureThreshold;
    this.successThreshold = config.successThreshold;
    this.timeout = config.timeout;
  }

  private logStateTransition(newState: 'CLOSED' | 'OPEN' | 'HALF_OPEN'): void {
    console.log(
      `Circuit breaker state transition: ${this.state} -> ${newState}`,
    );
  }

  public async call(action: () => Promise<void>): Promise<void> {
    if (this.state === 'OPEN' && Date.now() < this.nextAttempt) {
      throw new Error('Circuit breaker is open');
    }

    try {
      await timeoutPromise(action(), this.timeout);
      this.success();
    } catch (error) {
      this.fail();
      throw error;
    }
  }

  private success(): void {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        this.logStateTransition('CLOSED');
        this.state = 'CLOSED';
        this.successCount = 0;
      }
    }
  }

  private fail(): void {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      if (this.state !== 'OPEN') {
        this.logStateTransition('OPEN');
      }
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    } else if (this.state === 'HALF_OPEN') {
      this.logStateTransition('OPEN');
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
