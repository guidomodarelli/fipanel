import { SymbolPrice } from './SymbolPrice';

export interface SymbolService {
  getSymbolPriceMonthly(symbol: string): Promise<SymbolPrice[]>;
}
