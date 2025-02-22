import type { UnitTypes } from './types';

export interface Calendar {
  date: Date;

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
  diff(date: Calendar, unit: UnitTypes): number;

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
  format(template: string): string;

  isBefore(date: Calendar): boolean;

  isAfter(date: Calendar): boolean;

  isJanuary(date: Date): boolean;

  isFebruary(date: Date): boolean;

  isMarch(date: Date): boolean;

  isApril(date: Date): boolean;

  isMay(date: Date): boolean;

  isJune(date: Date): boolean;

  isJuly(date: Date): boolean;

  isAugust(date: Date): boolean;

  isSeptember(date: Date): boolean;

  isOctober(date: Date): boolean;

  isNovember(date: Date): boolean;

  isDecember(date: Date): boolean;

  isLastYear(date: Date): boolean;
}
