import { DolarMap } from '@/core/contexts/Dolar/domain/DolarMap';
import { getDolars } from '@/app/setup';
import { useQuery } from '@tanstack/react-query';

export function useDolar() {
  const { data: dolars, isLoading } = useQuery<DolarMap>({
    queryKey: ['dolars'],
    queryFn: getDolars,
  });

  return {
    ...dolars,
    isLoading,
  };
}
