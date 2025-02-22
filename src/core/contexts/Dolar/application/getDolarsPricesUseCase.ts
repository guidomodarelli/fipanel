import type { DolarProvider } from '../domain/DolarProvider';

export const getDolarsPricesUseCase = (dolarProvider: DolarProvider) => {
  return () => dolarProvider.getDolarPrices();
};
