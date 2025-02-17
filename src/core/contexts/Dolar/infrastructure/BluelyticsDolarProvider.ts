import { HttpService } from '../../shared/http/domain/HttpService';
import { DolarPriceMap } from '../domain/DolarPriceMap';
import { DolarProvider } from '../domain/DolarProvider';
import { FinancialValues } from '../domain/FinancialValues';
import { BluelyticsMoneyResponse } from './BluelyticsMoneyResponse';

export class BluelyticsDolarProvider implements DolarProvider {
  constructor(private readonly httpService: HttpService) {}

  private responseToDolars(money: BluelyticsMoneyResponse): FinancialValues {
    return {
      buy: money.value_buy,
      sell: money.value_sell,
      avg: money.value_avg,
    };
  }

  async getDolarPrices(): Promise<DolarPriceMap> {
    const response = await this.httpService.get('https://api.bluelytics.com.ar/v2/latest');
    return {
      oficial: this.responseToDolars(response.oficial),
      blue: this.responseToDolars(response.blue),
    };
  }
}
