import type { Status } from './types';

export interface Logger {
  log(...args: unknown[]): void;
  debug(...args: unknown[]): void;
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
  getLogger(context: string[], status?: Status): Logger;
}
