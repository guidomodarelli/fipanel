import { DolarPriceMap } from './DolarMap';

export interface DolarProvider {
  getDolarPrices(): Promise<DolarPriceMap>;
}
