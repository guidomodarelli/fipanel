export class DateRangeError extends Error {
  constructor() {
    super('The from date must be earlier than the to date.');
    this.name = 'DateRangeError';
  }
}
