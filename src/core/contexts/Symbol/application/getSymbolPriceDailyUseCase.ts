import { SymbolProvider } from '../domain/SymbolProvider';

export const getSymbolPriceDailyUseCase = (symbolProvider: SymbolProvider) => (symbol: string) => {
  return symbolProvider.getSymbolPriceDaily(symbol);
};
