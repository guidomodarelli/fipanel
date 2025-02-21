export class DateRangeLimitError extends Error {
  constructor(YEARS_LIMIT: number, UNIT_TYPE: string) {
    super(`The distance between from and to cannot be greater than ${YEARS_LIMIT} ${UNIT_TYPE}`);
    this.name = 'DateRangeLimitError';
  }
}
