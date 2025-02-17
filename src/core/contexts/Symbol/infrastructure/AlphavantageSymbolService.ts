import { HttpService } from '../../shared/http/domain/HttpService';
import { SymbolPriceInfo } from '../domain/SymbolPriceInfo';
import { SymbolProvider } from '../domain/SymbolProvider';
import { AlphavantageSymbolPriceMonthlyResponse } from './AlphavantageSymbolPriceMonthlyResponse';

export class AlphavantageSymbolService implements SymbolProvider {
  constructor(private readonly httpService: HttpService) {}

  async getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]> {
    const response = await this.httpService.get<AlphavantageSymbolPriceMonthlyResponse>(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${
        process.env.VITE_API_KEY_ALPHAVANTAGE
      }`,
    );

    const monthlyTimeSeries = Object.entries(response['Monthly Time Series']);

    return monthlyTimeSeries.reduce((acc, [date, symbolPriceResponse]) => {
      acc.push({
        open: parseFloat(symbolPriceResponse['1. open']),
        close: parseFloat(symbolPriceResponse['4. close']),
        high: parseFloat(symbolPriceResponse['2. high']),
        low: parseFloat(symbolPriceResponse['3. low']),
        date: new Date(date),
      });
      return acc;
    }, {} as SymbolPriceInfo[]);
  }
}
