import dayjs from 'dayjs';
import type { Calendar } from '../domain/Calendar';
import { MONTH, type UnitTypes } from '../domain/types';

export class DayjsCalendar implements Calendar {
  private _date: Date;

  constructor(date?: Date) {
    this._date = date || new Date();
  }

  get date(): Date {
    return this._date;
  }

  /**
   * This indicates the difference between two date-time in the specified unit.
   *
   * To get the difference in milliseconds, use `cal#diff`
   * ```
   * const date1 = cal('2019-01-25')
   * const date2 = cal('2018-06-05')
   * date1.diff(date2) // 20214000000 default milliseconds
   * date1.diff() // milliseconds to current time
   * ```
   *
   * To get the difference in another unit of measurement, pass that measurement as the second argument.
   * ```
   * const date1 = cal('2019-01-25')
   * date1.diff('2018-06-05', 'month') // 7
   * ```
   * Units are case insensitive, and support plural and short forms.
   *
   */
  diff(date: Calendar, unit: UnitTypes): number {
    return dayjs(this._date).diff(dayjs(date.date), unit);
  }

  /**
   * Get the formatted date according to the string of tokens passed in.
   *
   * To escape characters, wrap them in square brackets (e.g. [MM]).
   * ```
   * cal().format()// => current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
   * cal('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')// 'YYYYescape 2019-01-25T00:00:00-02:00Z'
   * cal('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
   * ```
   */
  format(template: string): string {
    return dayjs(this._date).format(template);
  }

  isBefore(date: Calendar): boolean {
    return dayjs(this._date).isBefore(dayjs(date.date));
  }

  isAfter(date: Calendar): boolean {
    return dayjs(this._date).isAfter(dayjs(date.date));
  }

  isJanuary(date: Date): boolean {
    return dayjs(date).month() === MONTH.JANUARY;
  }

  isFebruary(date: Date): boolean {
    return dayjs(date).month() === MONTH.FEBRUARY;
  }

  isMarch(date: Date): boolean {
    return dayjs(date).month() === MONTH.MARCH;
  }

  isApril(date: Date): boolean {
    return dayjs(date).month() === MONTH.APRIL;
  }

  isMay(date: Date): boolean {
    return dayjs(date).month() === MONTH.MAY;
  }

  isJune(date: Date): boolean {
    return dayjs(date).month() === MONTH.JUNE;
  }

  isJuly(date: Date): boolean {
    return dayjs(date).month() === MONTH.JULY;
  }

  isAugust(date: Date): boolean {
    return dayjs(date).month() === MONTH.AUGUST;
  }

  isSeptember(date: Date): boolean {
    return dayjs(date).month() === MONTH.SEPTEMBER;
  }

  isOctober(date: Date): boolean {
    return dayjs(date).month() === MONTH.OCTOBER;
  }

  isNovember(date: Date): boolean {
    return dayjs(date).month() === MONTH.NOVEMBER;
  }

  isDecember(date: Date): boolean {
    return dayjs(date).month() === MONTH.DECEMBER;
  }

  isLastYear(date: Date): boolean {
    return dayjs(date).year() === dayjs().year() - 1;
  }
}
