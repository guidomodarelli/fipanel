import type { HttpService } from '../../shared/http/domain/HttpService';
import type { DolarPriceMap } from '../domain/DolarPriceMap';
import type { DolarProvider } from '../domain/DolarProvider';
import type { FinancialValues } from '../domain/FinancialValues';
import type { BluelyticsDolarResponse, BluelyticsValueResponse } from './BluelyticsMoneyResponse';

const BASE_URL = 'https://api.bluelytics.com.ar/v2';

export class BluelyticsDolarProvider implements DolarProvider {
  constructor(private readonly httpService: HttpService) {}

  private responseToDolars(money: BluelyticsValueResponse): FinancialValues {
    return {
      buy: money.value_buy,
      sell: money.value_sell,
      avg: money.value_avg,
    };
  }

  async get<T>(path: string): Promise<T> {
    return this.httpService.get<T>(`${BASE_URL}${path}`);
  }

  async getDolarPrices(): Promise<DolarPriceMap> {
    const response = await this.get<BluelyticsDolarResponse>('/latest');
    return {
      oficial: this.responseToDolars(response.oficial),
      blue: this.responseToDolars(response.blue),
    };
  }
}
