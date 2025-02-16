import { HttpService } from '../../shared/http/domain/HttpService';
import { SymbolPrice } from '../domain/SymbolPrice';
import { SymbolService } from '../domain/SymbolService';
import { FinhubSymbolServiceResponse } from './FinhubSymbolServiceResponse';

export class FinhubSymbolService implements SymbolService {
  constructor(private readonly httpService: HttpService) {}

  async getPriceMonthly(symbol: string): Promise<SymbolPrice[]> {
    const response = await this.httpService.get<FinhubSymbolServiceResponse>(
      `https://finnhub.io/api/v1/stock/candle?token=${process.env.FINNHUB_API_KEY}&symbol=${symbol}`,
    );

    return {
      open: response.o,
      close: response.pc,
      high: response.h,
      low: response.l,
      percentChange: response.dp,
      change: response.d,
      currentPrice: response.c,
    };
  }
}
