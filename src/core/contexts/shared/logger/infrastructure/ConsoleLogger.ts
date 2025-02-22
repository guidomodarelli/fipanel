import type { Logger } from '../domain/Logger';

export class ConsoleLogger implements Logger {
  constructor(private _context?: string[]) {}

  private get context(): string {
    return this._context?.join(', ') || '';
  }

  log(message: string, ...args: any[]): void {
    console.log(`[${this.context}] ${message}`, ...args);
  }

  debug(message: string, ...args: any[]): void {
    console.debug(`[${this.context}] ${message}`, ...args);
  }

  info(message: string, ...args: any[]): void {
    console.info(`[${this.context}] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[${this.context}] ${message}`, ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(`[${this.context}] ${message}`, ...args);
  }

  get(newContext: string): Logger {
    return new ConsoleLogger([...(this._context || []), newContext]);
  }
}
