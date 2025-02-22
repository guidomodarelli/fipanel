import { faker } from '@faker-js/faker';
import type { SymbolPriceInfo } from '../domain/SymbolPriceInfo';
import type { SymbolProvider } from '../domain/SymbolProvider';

export class MockSymbolProvider implements SymbolProvider {
  public async getSymbolPriceMonthly(
    symbol: string,
    from: Date,
    to: Date,
  ): Promise<SymbolPriceInfo[]> {
    return Promise.resolve(this.generateMonthlyMockData(from, to));
  }

  public async getSymbolPriceDaily(
    symbol: string,
    from: Date,
    to: Date,
  ): Promise<SymbolPriceInfo[]> {
    return Promise.resolve(this.generateDailyMockData(from, to));
  }

  private generateDailyMockData(from: Date, to: Date): SymbolPriceInfo[] {
    const mockData: SymbolPriceInfo[] = [];
    const currentDate = new Date(from);

    while (currentDate <= to) {
      // Check if the day is Saturday (6) or Sunday (0)
      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        mockData.push({
          open: Number.parseFloat(
            faker.finance.amount({ min: 100, max: 200, dec: 2 }),
          ),
          close: Number.parseFloat(
            faker.finance.amount({ min: 100, max: 200, dec: 2 }),
          ),
          high: Number.parseFloat(
            faker.finance.amount({ min: 200, max: 300, dec: 2 }),
          ),
          low: Number.parseFloat(
            faker.finance.amount({ min: 50, max: 100, dec: 2 }),
          ),
          date: new Date(currentDate),
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return mockData;
  }

  private generateMonthlyMockData(from: Date, to: Date): SymbolPriceInfo[] {
    const startYear = from.getFullYear();
    const endYear = to.getFullYear();
    const mockData: SymbolPriceInfo[] = [];

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        if (year === to.getFullYear() && month > to.getMonth()) {
          break;
        }
        const lastDayOfMonth = new Date(year, month + 1, 0);
        mockData.push({
          open: Number.parseFloat(
            faker.finance.amount({ min: 100, max: 200, dec: 2 }),
          ),
          close: Number.parseFloat(
            faker.finance.amount({ min: 100, max: 200, dec: 2 }),
          ),
          high: Number.parseFloat(
            faker.finance.amount({ min: 200, max: 300, dec: 2 }),
          ),
          low: Number.parseFloat(
            faker.finance.amount({ min: 50, max: 100, dec: 2 }),
          ),
          date: lastDayOfMonth,
        });
      }
    }
    return mockData;
  }
}
