import { BCRA } from '../domain/BCRA';

export const getPrincipalesVariablesUseCase = (bcraService: BCRA) => {
  return () => bcraService.getPrincipalesVariables();
};
