import { getDolars } from '@/app/setup';
import { DolarPriceMap } from '@/core/contexts/Dolar/domain/DolarPriceMap';
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
