import type { Logger } from '../domain/Logger';

export class ConsoleLogger implements Logger {
  constructor(private _context?: string[]) {}

  private get context(): string {
    return this._context?.join(', ') || '';
  }

  private print(level: string, message: string, ...args: any[]): void {
    console.log(`[ ${level} ]${this.context ? ` [${this.context}]` : ''} ${message}`, ...args);
  }

  log(message: string, ...args: any[]): void {
    this.print('LOG', message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.print('DEBUG', message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.print('INFO', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.print('WARN', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.print('ERROR', message, ...args);
  }

  get(newContext: string): Logger {
    return new ConsoleLogger([...(this._context || []), newContext]);
  }
}
