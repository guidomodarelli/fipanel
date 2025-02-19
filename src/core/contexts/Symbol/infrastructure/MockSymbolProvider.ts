import { faker } from '@faker-js/faker';
import { SymbolPriceInfo } from '../domain/SymbolPriceInfo';
import { SymbolProvider } from '../domain/SymbolProvider';

export class MockSymbolProvider implements SymbolProvider {
  public async getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]> {
    const mockData = this.generateMonthlyMockData();

    return Promise.resolve(mockData);
  }

  public async getSymbolPriceDaily(symbol: string): Promise<SymbolPriceInfo[]> {
    const mockData = this.generateDailyMockData();

    return Promise.resolve(mockData);
  }

  private generateDailyMockData(): SymbolPriceInfo[] {
    const currentDate = new Date();
    const mockData: SymbolPriceInfo[] = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);

      // Check if the day is Saturday (6) or Sunday (0)
      if (date.getDay() === 6 || date.getDay() === 0) {
        continue;
      }

      mockData.push({
        open: parseFloat(faker.finance.amount({ min: 100, max: 200, dec: 2 })),
        close: parseFloat(faker.finance.amount({ min: 100, max: 200, dec: 2 })),
        high: parseFloat(faker.finance.amount({ min: 200, max: 300, dec: 2 })),
        low: parseFloat(faker.finance.amount({ min: 50, max: 100, dec: 2 })),
        date: date,
      });
    }
    return mockData;
  }

  private generateMonthlyMockData(): SymbolPriceInfo[] {
    const startYear = 1990;
    const currentDate = new Date();
    const endYear = currentDate.getFullYear();
    const mockData: SymbolPriceInfo[] = [];

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        if (year === currentDate.getFullYear() && month > currentDate.getMonth()) {
          break;
        }
        const lastDayOfMonth = new Date(year, month + 1, 0);
        mockData.push({
          open: parseFloat(faker.finance.amount({ min: 100, max: 200, dec: 2 })),
          close: parseFloat(faker.finance.amount({ min: 100, max: 200, dec: 2 })),
          high: parseFloat(faker.finance.amount({ min: 200, max: 300, dec: 2 })),
          low: parseFloat(faker.finance.amount({ min: 50, max: 100, dec: 2 })),
          date: lastDayOfMonth,
        });
      }
    }
    return mockData;
  }
}
