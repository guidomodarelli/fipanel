import { caljs } from '@/app/setup';
import { DateRangeError } from '../../shared/date/domain/DateRangeError';
import { DateRangeLimitError } from '../../shared/date/domain/DateRangeLimitError';
import type { UnitTypes } from '../../shared/date/domain/types';
import type { SymbolProvider } from '../domain/SymbolProvider';

const MONTHS_LIMIT = 1;
const UNIT_TYPE: UnitTypes = 'months';

export const getSymbolPriceDailyUseCase =
  (symbolProvider: SymbolProvider) =>
  (symbol: string, from: Date, to: Date) => {
    if (from >= to) {
      throw new DateRangeError();
    }
    if (caljs(to).diff(caljs(from), UNIT_TYPE) > MONTHS_LIMIT) {
      throw new DateRangeLimitError(MONTHS_LIMIT, UNIT_TYPE);
    }
    return symbolProvider.getSymbolPriceDaily(symbol, from, to);
  };
