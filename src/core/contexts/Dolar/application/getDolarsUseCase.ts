import { Dolar } from '../domain/Dolar';

export const getDolarsUseCase = (dolarService: Dolar) => {
  return () => dolarService.getDolars();
};
