import { Logger } from './Logger';
import { Status } from './types';

export class LoggerDecorator {
  private constructor(
    private logger: Logger,
    private status: Status = 'enabled',
  ) {}

  static create(logger: Logger, status: Status): LoggerDecorator {
    return new LoggerDecorator(logger, status);
  }

  log(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    this.logger.log(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    this.logger.debug(message, ...args);
  }

  info(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    this.logger.error(message, ...args);
  }

  getLogger(newContext: string[], status: Status): Logger {
    return LoggerDecorator.create(this.logger.getLogger(newContext, status), status);
  }
}
