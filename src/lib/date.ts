import { MONTH } from '@/core/contexts/shared/date/domain/types';

export class DateUtils {
  static isDecember(date: Date) {
    return date.getMonth() === MONTH.DECEMBER;
  }

  static format(date: Date) {
    return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'numeric', year: 'numeric' });
  }
}
