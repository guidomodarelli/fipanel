import { DolarPriceMap } from './DolarPriceMap';

export interface DolarProvider {
  getDolarPrices(): Promise<DolarPriceMap>;
}
