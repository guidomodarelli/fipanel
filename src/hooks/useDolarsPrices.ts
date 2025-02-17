import { getDolarsPrices } from '@/app/setup';
import { DolarPriceMap } from '@/core/contexts/Dolar/domain/DolarPriceMap';
import { useQuery } from '@tanstack/react-query';

export function useDolarsPrices() {
  const { data: dolars, isLoading } = useQuery<DolarPriceMap>({
    queryKey: ['dolars'],
    queryFn: getDolarsPrices,
  });

  return {
    ...dolars,
    isLoading,
  };
}
