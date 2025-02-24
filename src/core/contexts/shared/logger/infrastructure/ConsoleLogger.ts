import chalk from 'chalk';
import type { Logger } from '../domain/Logger';

export class ConsoleLogger implements Logger {
  constructor(private context: string[] = []) {}

  private print(level: string, ...args: unknown[]) {
    const timestamp = new Date().toLocaleTimeString();
    const contextStr = this.context.length ? ` [${chalk.bold.gray(this.context.join(' » '))}]` : '';
    console.log(`[${chalk.gray(timestamp)}] [${level}]${contextStr} `, ...args);
  }

  log(...args: unknown[]): void {
    this.print(chalk.bold.white('LOG'), ...args);
  }

  debug(...args: unknown[]): void {
    this.print(chalk.bold.cyan('DEBUG'), ...args);
  }

  info(...args: unknown[]): void {
    this.print(chalk.bold.blue('INFO'), ...args);
  }

  warn(...args: unknown[]): void {
    this.print(chalk.bold.yellow('WARN'), ...args);
  }

  error(...args: unknown[]): void {
    this.print(chalk.bold.red('ERROR'), ...args);
  }

  getLogger(newContext: string[]): Logger {
    return new ConsoleLogger([...this.context, ...newContext]);
  }
}
