import { FinancialIndicators } from './FinancialIndicators';

export interface FinancialDataProvider {
  getPrimaryFinancialMetrics(): Promise<FinancialIndicators>;
}
