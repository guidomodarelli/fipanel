import { Logger } from './Logger';
import { Status } from './types';

export type LoggerFactory = {
  create: (context: string[], status: Status) => Logger;
};

export const LoggerFactory =
  (logger: LoggerFactory) =>
  (initialContext: Function, status: Status): Logger => {
    if (typeof initialContext !== 'function') {
      throw new Error('initialContext must be a function');
    }
    if (initialContext.name === '') {
      throw new Error('initialContext must be a named function');
    }
    return logger.create([initialContext.name], status);
  };
