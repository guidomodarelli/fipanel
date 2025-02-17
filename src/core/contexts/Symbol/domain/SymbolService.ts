import { SymbolPrice } from './SymbolPrice';

export interface SymbolService {
  getPriceMonthly(symbol: string): Promise<SymbolPrice[]>;
}
