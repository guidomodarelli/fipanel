import type { Logger } from '../domain/Logger';

const print =
  (context: string[]) =>
  (level: string, message: string, ...args: any[]) => {
    const contextStr = context.length ? ` [${context.join(', ')}]` : '';
    console.log(`[${level}]${contextStr} ${message}`, ...args);
  };

export const ConsoleLogger = {
  create: (context: string[] = []) => ({
    context,

    log(message: string, ...args: any[]): void {
      print(context)('LOG', message, ...args);
    },

    debug(message: string, ...args: any[]): void {
      print(context)('DEBUG', message, ...args);
    },

    info(message: string, ...args: any[]): void {
      print(context)('INFO', message, ...args);
    },

    warn(message: string, ...args: any[]): void {
      print(context)('WARN', message, ...args);
    },

    error(message: string, ...args: any[]): void {
      print(context)('ERROR', message, ...args);
    },

    get(newContext: string): Logger {
      return ConsoleLogger.create([...context, newContext]);
    },
  }),
} satisfies { create: (context?: string[]) => Logger };
