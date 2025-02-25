import type { Logger } from './Logger';
import { LoggerDecorator } from './LoggerDecorator';
import type { Status } from './types';

export type LoggerFactory = {
  create: (context: string[], status: Status) => Logger;
};

export const LoggerFactory =
  (logger: Logger) =>
  (initialContext: string, status: Status): Logger => {
    if (typeof initialContext !== 'string') {
      throw new Error('initialContext must be a string');
    }
    if (initialContext === '') {
      throw new Error('initialContext cannot be an empty string');
    }
    const loggerInstance = logger.getLogger([initialContext]);
    return LoggerDecorator.create(loggerInstance, status);
  };
