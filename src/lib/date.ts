import { MONTH } from '@/core/contexts/shared/date/domain/types';

export const DateUtils = {
  isDecember(date: Date) {
    return date.getMonth() === MONTH.DECEMBER;
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
