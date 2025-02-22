import { getPrimaryFinancialMetrics } from '@/app/setup';
import type { FinancialIndicators } from '@/core/contexts/Metrics/domain/FinancialIndicators';
import { useQuery } from '@tanstack/react-query';

export function usePrimaryFinancialMetrics() {
  const { data: principalesVariables, isLoading } =
    useQuery<FinancialIndicators>({
      queryKey: ['principalesVariables'],
      queryFn: getPrimaryFinancialMetrics,
    });

  return {
    ...principalesVariables,
    isLoading,
  };
}
