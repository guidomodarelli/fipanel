import { LoggerFactory } from '../domain/LoggerFactory';
import { NoopLogger } from '../domain/NoopLogger';

export const createLoggerUseCase =
  (logger: LoggerFactory) => (InitialContext: Function, status: 'enabled' | 'disabled') => {
    if (typeof InitialContext !== 'function') {
      throw new Error('InitialContext must be a function');
    }
    return status === 'enabled' ? logger.create([InitialContext.name]) : NoopLogger;
  };
