import { SymbolPrice } from '../domain/SymbolPrice';
import { SymbolService } from '../domain/SymbolService';

export class MockSymbolPriceMonthlyService implements SymbolService {
  getSymbolPriceMonthly(symbol: string): Promise<SymbolPrice[]> {
    return Promise.resolve([
      {
        open: 150,
        close: 152,
        high: 154,
        low: 149,
        date: new Date('2024-03-01'),
      },
      {
        open: 155,
        close: 157,
        high: 159,
        low: 154,
        date: new Date('2024-04-01'),
      },
      {
        open: 160,
        close: 162,
        high: 164,
        low: 159,
        date: new Date('2024-05-01'),
      },
      {
        open: 165,
        close: 167,
        high: 169,
        low: 164,
        date: new Date('2024-06-01'),
      },
      {
        open: 170,
        close: 172,
        high: 174,
        low: 169,
        date: new Date('2024-07-01'),
      },
      {
        open: 175,
        close: 177,
        high: 179,
        low: 174,
        date: new Date('2024-08-01'),
      },
      {
        open: 180,
        close: 182,
        high: 184,
        low: 179,
        date: new Date('2024-09-01'),
      },
      {
        open: 185,
        close: 187,
        high: 189,
        low: 184,
        date: new Date('2024-10-01'),
      },
      {
        open: 190,
        close: 192,
        high: 194,
        low: 189,
        date: new Date('2024-11-01'),
      },
      {
        open: 195,
        close: 197,
        high: 199,
        low: 194,
        date: new Date('2024-12-01'),
      },
      {
        open: 200,
        close: 202,
        high: 204,
        low: 199,
        date: new Date('2025-01-01'),
      },
      {
        open: 205,
        close: 207,
        high: 209,
        low: 204,
        date: new Date('2025-02-01'),
      },
    ]);
  }
}
