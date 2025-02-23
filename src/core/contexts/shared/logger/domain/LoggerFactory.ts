import type { Logger } from './Logger';
import { LoggerDecorator } from './LoggerDecorator';
import type { Status } from './types';

export type LoggerFactory = {
  create: (context: string[], status: Status) => Logger;
};

export const LoggerFactory =
  (logger: Logger) =>
  (initialContext: () => void, status: Status): Logger => {
    if (typeof initialContext !== 'function') {
      throw new Error('initialContext must be a function');
    }
    if (initialContext.name === '') {
      throw new Error('initialContext must be a named function');
    }
    const loggerInstance = logger.getLogger([initialContext.name]);
    return LoggerDecorator.create(loggerInstance, status);
  };
