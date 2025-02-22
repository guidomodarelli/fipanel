import { caljs } from '@/app/setup';
import { DateRangeError } from '../../shared/date/domain/DateRangeError';
import { DateRangeLimitError } from '../../shared/date/domain/DateRangeLimitError';
import type { UnitTypes } from '../../shared/date/domain/types';
import type { SymbolProvider } from '../domain/SymbolProvider';

const YEARS_LIMIT = 25;
const UNIT_TYPE: UnitTypes = 'years';

export const getSymbolPriceMonthlyUseCase =
  (symbolProvider: SymbolProvider) => (symbol: string, from: Date, to: Date) => {
    if (from >= to) {
      throw new DateRangeError();
    }
    if (caljs(to).diff(caljs(from), UNIT_TYPE) > YEARS_LIMIT) {
      throw new DateRangeLimitError(YEARS_LIMIT, UNIT_TYPE);
    }
    return symbolProvider.getSymbolPriceMonthly(symbol, from, to);
  };
