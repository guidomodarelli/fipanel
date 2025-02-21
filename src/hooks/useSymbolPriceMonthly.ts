import { caljs, getSymbolPriceMonthly } from '@/app/setup';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface SymbolPriceMonthlyProps {
  symbol: string;
  from: Date;
  to: Date;
}

export const useSymbolPriceMonthly = ({ symbol, from, to }: SymbolPriceMonthlyProps) => {
  const { data: dataMonthly, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['symbolPriceMonthly'],
    queryFn: () => getSymbolPriceMonthly(symbol, from, to),
  });

  const isLastYear = (date: Date) => {
    return date.getFullYear() === new Date().getFullYear() - 1;
  };

  const getAnnualPrices = useMemo(() => {
    return dataMonthly?.filter((price) => caljs().isDecember(price.date));
  }, [dataMonthly]);

  const getTheLastAnnualPrice = useMemo(() => {
    return getAnnualPrices?.find((price) => isLastYear(price.date));
  }, [getAnnualPrices]);

  return {
    dataMonthly,
    getTheLastAnnualPrice,
    getAnnualPrices,
    isLoading: isLoadingMonthly,
  };
};
