import { SymbolService } from '../domain/SymbolService';

export const getSymbolPriceMonthlyUseCase = (symbolProvider: SymbolService) => (symbol: string) => {
  return symbolProvider.getSymbolPriceMonthly(symbol);
};
