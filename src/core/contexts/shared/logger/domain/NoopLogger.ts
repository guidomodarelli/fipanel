import type { Logger } from './Logger';
import { Status } from './types';

export const NoopLogger: () => Logger = () => ({
  log: (_message: string, ..._args: any[]): void => {},
  debug: (_message: string, ..._args: any[]): void => {},
  info: (_message: string, ..._args: any[]): void => {},
  warn: (_message: string, ..._args: any[]): void => {},
  error: (_message: string, ..._args: any[]): void => {},
  getLogger: (_newContext: string[], _status: Status): Logger => NoopLogger(),
});
