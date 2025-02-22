import type { Logger } from '../domain/Logger';

export const NoopLogger: Logger = {
  log: (message: string, ...args: any[]): void => {},
  debug: (message: string, ...args: any[]): void => {},
  info: (message: string, ...args: any[]): void => {},
  warn: (message: string, ...args: any[]): void => {},
  error: (message: string, ...args: any[]): void => {},
  get: (newContext: string): Logger => NoopLogger,
};
