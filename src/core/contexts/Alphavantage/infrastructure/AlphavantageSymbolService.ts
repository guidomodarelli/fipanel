import { HttpService } from '../../shared/http/domain/HttpService';
import { SymbolPrice } from '../domain/SymbolPrice';
import { SymbolService } from '../domain/SymbolService';
import { SymbolPriceMonthlyResponse } from './SymbolPriceMonthlyResponse';

export class AlphavantageSymbolService implements SymbolService {
  constructor(private readonly httpService: HttpService) {}

  async getPriceMonthly(symbol: string): Promise<SymbolPrice[]> {
    const response = await this.httpService.get<SymbolPriceMonthlyResponse>(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${
        import.meta.env.VITE_API_KEY_ALPHAVANTAGE
      }`,
    );

    const monthlyTimeSeries = Object.entries(response['Monthly Time Series']);

    return monthlyTimeSeries.reduce((acc, [date, symbolPriceResponse]) => {
      acc.push({
        open: parseFloat(symbolPriceResponse['1. open']),
        close: parseFloat(symbolPriceResponse['4. close']),
        date: new Date(date),
      });
      return acc;
    }, {} as SymbolPrice[]);
  }
}
