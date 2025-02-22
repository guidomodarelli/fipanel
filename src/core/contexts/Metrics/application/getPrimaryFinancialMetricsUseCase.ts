import type { FinancialDataProvider } from '../domain/FinancialDataProvider';

export const getPrimaryFinancialMetricsUseCase = (
  bcraProvider: FinancialDataProvider,
) => {
  return () => bcraProvider.getPrimaryFinancialMetrics();
};
