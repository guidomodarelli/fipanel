import { faker } from '@faker-js/faker';
import { SymbolPrice } from '../domain/SymbolPrice';
import { SymbolService } from '../domain/SymbolService';

export class MockSymbolPriceMonthlyService implements SymbolService {
  getSymbolPriceMonthly(symbol: string): Promise<SymbolPrice[]> {
    const mockData = this.getMockData();

    return Promise.resolve(mockData);
  }

  private getMockData(): SymbolPrice[] {
    const startYear = 1990;
    const currentDate = new Date();
    const endYear = currentDate.getFullYear();
    const mockData: SymbolPrice[] = [];

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        if (year === currentDate.getFullYear() && month > currentDate.getMonth()) {
          break;
        }
        mockData.push({
          open: parseFloat(faker.finance.amount({ min: 100, max: 200, dec: 2 })),
          close: parseFloat(faker.finance.amount({ min: 100, max: 200, dec: 2 })),
          high: parseFloat(faker.finance.amount({ min: 200, max: 300, dec: 2 })),
          low: parseFloat(faker.finance.amount({ min: 50, max: 100, dec: 2 })),
          date: new Date(year, month, 1),
        });
      }
    }
    return mockData;
  }
}
