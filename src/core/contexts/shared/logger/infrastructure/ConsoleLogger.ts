import chalk from 'chalk';
import type { Logger } from '../domain/Logger';
import { LoggerFactory } from '../domain/LoggerFactory';

const print =
  (context: string[]) =>
  (level: string, message: string, ...args: any[]) => {
    const timestamp = new Date().toLocaleTimeString();
    const contextStr = context.length ? ` [${chalk.bold.gray(context.join(' » '))}]` : '';
    console.log(`[${chalk.gray(timestamp)}] [${level}]${contextStr} ${message}`, ...args);
  };

export const ConsoleLogger: LoggerFactory = {
  create: (context: string[] = []) => ({
    context,

    log(message: string, ...args: any[]): void {
      print(context)(chalk.bold.white('LOG'), message, ...args);
    },

    debug(message: string, ...args: any[]): void {
      print(context)(chalk.bold.cyan('DEBUG'), message, ...args);
    },

    info(message: string, ...args: any[]): void {
      print(context)(chalk.bold.blue('INFO'), message, ...args);
    },

    warn(message: string, ...args: any[]): void {
      print(context)(chalk.bold.yellow('WARN'), message, ...args);
    },

    error(message: string, ...args: any[]): void {
      print(context)(chalk.bold.red('ERROR'), message, ...args);
    },

    get(newContext: string): Logger {
      return ConsoleLogger.create([...context, newContext]);
    },
  }),
};
