import type { Logger } from './Logger';
import type { Status } from './types';

export class NoopLogger implements Logger {
  log(_message: string, ..._args: unknown[]): void {}
  debug(_message: string, ..._args: unknown[]): void {}
  info(_message: string, ..._args: unknown[]): void {}
  warn(_message: string, ..._args: unknown[]): void {}
  error(_message: string, ..._args: unknown[]): void {}
  getLogger(_newContext: string[], _status: Status): Logger {
    return new NoopLogger();
  }
}
