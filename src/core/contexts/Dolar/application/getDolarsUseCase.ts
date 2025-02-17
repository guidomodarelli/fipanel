import { DolarProvider } from '../domain/Dolar';

export const getDolarsPricesUseCase = (dolarProvider: DolarProvider) => {
  return () => dolarProvider.getDolarPrices();
};
