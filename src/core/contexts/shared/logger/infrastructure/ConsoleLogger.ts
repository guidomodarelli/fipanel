import chalk from 'chalk';
import type { Logger } from '../domain/Logger';
import { LoggerFactory } from '../domain/LoggerFactory';
import { Status } from '../domain/types';

const print =
  (context: string[]) =>
  (level: string, message: string, ...args: any[]) => {
    const timestamp = new Date().toLocaleTimeString();
    const contextStr = context.length ? ` [${chalk.bold.gray(context.join(' » '))}]` : '';
    console.log(`[${chalk.gray(timestamp)}] [${level}]${contextStr} ${message}`, ...args);
  };

class ConsoleLogger implements Logger {
  constructor(
    private context: string[],
    private status: Status = 'enabled',
  ) {}

  log(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    print(this.context)(chalk.bold.white('LOG'), message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    print(this.context)(chalk.bold.cyan('DEBUG'), message, ...args);
  }

  info(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    print(this.context)(chalk.bold.blue('INFO'), message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    print(this.context)(chalk.bold.yellow('WARN'), message, ...args);
  }

  error(message: string, ...args: any[]): void {
    if (this.status === 'disabled') return;
    print(this.context)(chalk.bold.red('ERROR'), message, ...args);
  }

  getLogger(newContext: string[], status: Status): Logger {
    return new ConsoleLogger([...this.context, ...newContext], status);
  }
}

export const ConsoleLoggerFactory: LoggerFactory = {
  create: (context: string[] = [], status) => new ConsoleLogger(context, status),
};
