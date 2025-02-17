import { SymbolService } from '../domain/SymbolService';

export const getSymbolPriceMonthlyUseCase = (symbolService: SymbolService) => (symbol: string) => {
  return symbolService.getSymbolPriceMonthly(symbol);
};
