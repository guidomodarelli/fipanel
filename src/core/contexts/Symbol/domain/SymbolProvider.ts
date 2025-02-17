import { SymbolPriceInfo } from './SymbolPriceInfo';

export interface SymbolProvider {
  getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]>;
}
