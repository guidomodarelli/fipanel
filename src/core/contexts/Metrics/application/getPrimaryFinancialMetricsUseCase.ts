import { FinancialDataProvider } from '../domain/FinancialDataProvider';

export const getPrimaryFinancialMetricsUseCase = (bcraService: FinancialDataProvider) => {
  return () => bcraService.getPrimaryFinancialMetrics();
};
