import type { HttpService } from '../../../shared/http/domain/HttpService';
import type { SymbolPriceInfo } from '../../domain/SymbolPriceInfo';
import type { SymbolProvider } from '../../domain/SymbolProvider';
import type { FinhubSymbolProviderResponse } from './FinhubSymbolProviderResponse';

const BASE_URL = 'https://finnhub.io/api/v1';

export class FinhubSymbolProvider implements SymbolProvider {
  constructor(private readonly httpService: HttpService) {}

  getSymbolPriceDaily(symbol: string): Promise<SymbolPriceInfo[]> {
    throw new Error('Method not implemented.');
  }

  async get(path: string): Promise<FinhubSymbolProviderResponse> {
    return this.httpService.get<FinhubSymbolProviderResponse>(
      `${BASE_URL}${path}&token=${process.env.FINNHUB_API_KEY}`,
    );
  }

  async getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]> {
    const response = await this.get(`stock/candle?symbol=${symbol}`);

    return [
      {
        open: response.o,
        close: response.pc,
        high: response.h,
        low: response.l,
        date: new Date(response.t),
      },
    ];
  }
}
