import chalk from 'chalk';
import type { Logger } from '../domain/Logger';

export class ConsoleLogger implements Logger {
  constructor(private context: string[] = []) {}

  private print(level: string, message: string, ...args: any[]) {
    const timestamp = new Date().toLocaleTimeString();
    const contextStr = this.context.length ? ` [${chalk.bold.gray(this.context.join(' » '))}]` : '';
    console.log(`[${chalk.gray(timestamp)}] [${level}]${contextStr} ${message}`, ...args);
  }

  log(message: string, ...args: any[]): void {
    this.print(chalk.bold.white('LOG'), message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.print(chalk.bold.cyan('DEBUG'), message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.print(chalk.bold.blue('INFO'), message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.print(chalk.bold.yellow('WARN'), message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.print(chalk.bold.red('ERROR'), message, ...args);
  }

  getLogger(newContext: string[]): Logger {
    return new ConsoleLogger([...this.context, ...newContext]);
  }
}
