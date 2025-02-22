import type { SymbolPriceInfo } from './SymbolPriceInfo';

export interface SymbolProvider {
  getSymbolPriceMonthly(symbol: string, from: Date, to: Date): Promise<SymbolPriceInfo[]>;
  getSymbolPriceDaily(symbol: string, from: Date, to: Date): Promise<SymbolPriceInfo[]>;
}
