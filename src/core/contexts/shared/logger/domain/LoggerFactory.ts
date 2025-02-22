import { Logger } from './Logger';

export type LoggerFactory = {
  create: (context?: string[]) => Logger;
};
