import type { HttpService } from '../../../shared/http/domain/HttpService';
import type { Logger } from '../../../shared/logger/domain/Logger';
import type { SymbolPriceInfo } from '../../domain/SymbolPriceInfo';
import type { SymbolProvider } from '../../domain/SymbolProvider';
import type { AlphaVantageSymbolMonthlyPriceResponse } from './AlphaVantageSymbolMonthlyPriceResponse';

const BASE_URL = 'https://www.alphavantage.co';
enum AlphavantageFunction {
  TIME_SERIES_MONTHLY = 'TIME_SERIES_MONTHLY',
}

export class AlphavantageSymbolProvider implements SymbolProvider {
  constructor(
    private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  getSymbolPriceDaily(_symbol: string): Promise<SymbolPriceInfo[]> {
    throw new Error('Method not implemented.');
  }

  async getExampleResponse(): Promise<AlphaVantageSymbolMonthlyPriceResponse> {
    return (await import('./AlphavantageExampleResponse')).default;
  }

  async get(path: string): Promise<AlphaVantageSymbolMonthlyPriceResponse> {
    return this.httpService.get<AlphaVantageSymbolMonthlyPriceResponse>(
      `${BASE_URL}${path}&apikey=${process.env.API_KEY_ALPHAVANTAGE}`,
    );
  }

  async getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]> {
    let response: AlphaVantageSymbolMonthlyPriceResponse;
    this.logger.debug('Getting monthly prices for symbol:', symbol);
    if (process.env.NODE_ENV === 'development') {
      this.logger.debug('Using example response');
      response = await this.getExampleResponse();
    } else {
      this.logger.debug('Using Alphavantage API');
      response = await this.get(`/query?function=${AlphavantageFunction.TIME_SERIES_MONTHLY}&symbol=${symbol}`);
    }

    return this.transformMonthlyTimeSeriesResponse(response);
  }

  private transformMonthlyTimeSeriesResponse(response: AlphaVantageSymbolMonthlyPriceResponse): SymbolPriceInfo[] {
    const monthlyTimeSeries = Object.entries(response['Monthly Time Series']);

    return monthlyTimeSeries.reduce((acc, [date, symbolPriceResponse]) => {
      acc.push({
        open: Number.parseFloat(symbolPriceResponse['1. open']),
        close: Number.parseFloat(symbolPriceResponse['4. close']),
        high: Number.parseFloat(symbolPriceResponse['2. high']),
        low: Number.parseFloat(symbolPriceResponse['3. low']),
        date: new Date(date),
      });
      return acc;
    }, [] as SymbolPriceInfo[]);
  }
}
