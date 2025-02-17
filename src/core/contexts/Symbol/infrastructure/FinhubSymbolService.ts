import { HttpService } from '../../shared/http/domain/HttpService';
import { SymbolPriceInfo } from '../domain/SymbolPriceInfo';
import { SymbolProvider } from '../domain/SymbolProvider';
import { FinhubSymbolServiceResponse } from './FinhubSymbolServiceResponse';

export class FinhubSymbolService implements SymbolProvider {
  constructor(private readonly httpService: HttpService) {}

  async getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]> {
    const response = await this.httpService.get<FinhubSymbolServiceResponse>(
      `https://finnhub.io/api/v1/stock/candle?token=${process.env.FINNHUB_API_KEY}&symbol=${symbol}`,
    );

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
