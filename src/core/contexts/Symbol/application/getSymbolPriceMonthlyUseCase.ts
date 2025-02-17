import { SymbolProvider } from '../domain/SymbolProvider';

export const getSymbolPriceMonthlyUseCase = (symbolProvider: SymbolProvider) => (symbol: string) => {
  return symbolProvider.getSymbolPriceMonthly(symbol);
};
