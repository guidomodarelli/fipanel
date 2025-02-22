import { Logger } from './Logger';
import { NoopLogger } from './NoopLogger';

export type LoggerFactory = {
  create: (context?: string[]) => Logger;
};

export const LoggerFactory =
  (logger: LoggerFactory) =>
  (initialContext: Function, status: 'enabled' | 'disabled'): Logger => {
    if (typeof initialContext !== 'function') {
      throw new Error('initialContext must be a function');
    }
    if (status === 'enabled') {
      return logger.create([initialContext.name]);
    }
    return NoopLogger;
  };
