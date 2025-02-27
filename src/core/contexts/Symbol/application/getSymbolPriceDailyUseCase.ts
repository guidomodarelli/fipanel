import dayjs from 'dayjs';
import { DateRangeError } from '../../shared/date/domain/DateRangeError';
import { DateRangeLimitError } from '../../shared/date/domain/DateRangeLimitError';
import type { SymbolProvider } from '../domain/SymbolProvider';

const MONTHS_LIMIT = 1;
const UNIT_TYPE: dayjs.UnitTypeLongPlural = 'months';

export const getSymbolPriceDailyUseCase =
  (symbolProvider: SymbolProvider) => (symbol: string, from: Date, to: Date) => {
    if (from >= to) {
      throw new DateRangeError();
    }
    if (dayjs(to).diff(dayjs(from), UNIT_TYPE) > MONTHS_LIMIT) {
      throw new DateRangeLimitError(MONTHS_LIMIT, UNIT_TYPE);
    }
    return symbolProvider.getSymbolPriceDaily(symbol, from, to);
  };
