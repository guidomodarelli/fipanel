import { HttpService } from '../../shared/http/domain/HttpService';
import { Dolar } from '../domain/Dolar';
import { DolarMap } from '../domain/DolarMap';
import { Money } from '../domain/Money';
import { MoneyHttpBluelyticsResponse } from './MoneyHttpBluelyticsResponse';

export class HttpBluelyticsDolar implements Dolar {
  constructor(private readonly httpService: HttpService) {}

  private responseToDolars(money: MoneyHttpBluelyticsResponse): Money {
    return {
      buy: money.value_buy,
      sell: money.value_sell,
      avg: money.value_avg,
    };
  }

  async getDolars(): Promise<DolarMap> {
    const response = await this.httpService.get('https://api.bluelytics.com.ar/v2/latest');
    return {
      oficial: this.responseToDolars(response.oficial),
      blue: this.responseToDolars(response.blue),
    };
  }
}
