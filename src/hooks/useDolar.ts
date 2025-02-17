import { getDolars } from '@/app/setup';
import { DolarPriceMap } from '@/core/contexts/Dolar/domain/DolarMap';
import { useQuery } from '@tanstack/react-query';

export function useDolar() {
  const { data: dolars, isLoading } = useQuery<DolarPriceMap>({
    queryKey: ['dolars'],
    queryFn: getDolars,
  });

  return {
    ...dolars,
    isLoading,
  };
}
