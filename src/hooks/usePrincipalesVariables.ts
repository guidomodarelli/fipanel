import { getPrincipalesVariables } from '@/app/setup';
import { PrincipalesVariables } from '@/core/contexts/BCRA/domain/PrincipalesVariables';
import { useQuery } from '@tanstack/react-query';

export function usePrincipalesVariables() {
  const { data: principalesVariables, isLoading } = useQuery<PrincipalesVariables>({
    queryKey: ['principalesVariables'],
    queryFn: getPrincipalesVariables,
  });

  return {
    ...principalesVariables,
    isLoading,
  };
}
