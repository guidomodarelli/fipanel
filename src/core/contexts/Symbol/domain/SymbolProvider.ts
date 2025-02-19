import { SymbolPriceInfo } from './SymbolPriceInfo';

export interface SymbolProvider {
  getSymbolPriceMonthly(symbol: string): Promise<SymbolPriceInfo[]>;
  getSymbolPriceDaily(symbol: string): Promise<SymbolPriceInfo[]>;
}
