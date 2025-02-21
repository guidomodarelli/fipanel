import { getSymbolPriceMonthly } from '@/app/setup';
import { DateUtils } from '@/lib/date';
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

  const getAnnualPrices = useMemo(() => {
    return dataMonthly?.filter((price) => DateUtils.isDecember(price.date));
  }, [dataMonthly]);

  const getTheLastAnnualPrice = useMemo(() => {
    return getAnnualPrices?.find((price) => DateUtils.isLastYear(price.date));
  }, [getAnnualPrices]);

  const getAnnualPriceArray = useMemo(() => {
    return getAnnualPrices?.map((price) => price.close);
  }, [dataMonthly]);

  return {
    dataMonthly,
    getTheLastAnnualPrice,
    getAnnualPrices: getAnnualPriceArray,
    isLoading: isLoadingMonthly,
  };
};
