import { MONTH } from '@/core/contexts/shared/date/domain/types';
import dayjs from 'dayjs';

export const DateUtils = {
  isDecember(date: Date) {
    return dayjs(date).month() === MONTH.DECEMBER;
  },

  format(date: Date, { withTime = false } = {}) {
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      ...(withTime && { hour: 'numeric', minute: 'numeric' }),
    });
  },

  isLastYear(date: Date) {
    return date.getFullYear() === new Date().getFullYear() - 1;
  },
};
