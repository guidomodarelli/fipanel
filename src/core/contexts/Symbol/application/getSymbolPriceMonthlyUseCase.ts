import dayjs from 'dayjs';
import { DateRangeError } from '../../shared/date/domain/DateRangeError';
import { DateRangeLimitError } from '../../shared/date/domain/DateRangeLimitError';
import type { SymbolProvider } from '../domain/SymbolProvider';

const YEARS_LIMIT = 25;
const UNIT_TYPE: dayjs.UnitTypeLongPlural = 'years';

export const getSymbolPriceMonthlyUseCase =
  (symbolProvider: SymbolProvider) => (symbol: string, from: Date, to: Date) => {
    if (from >= to) {
      throw new DateRangeError();
    }
    if (dayjs(to).diff(dayjs(from), UNIT_TYPE) > YEARS_LIMIT) {
      throw new DateRangeLimitError(YEARS_LIMIT, UNIT_TYPE);
    }
    return symbolProvider.getSymbolPriceMonthly(symbol, from, to);
  };
