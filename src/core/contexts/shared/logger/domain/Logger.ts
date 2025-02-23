import type { Status } from './types';

export interface Logger {
  log(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  getLogger(context: string[], status?: Status): Logger;
}
