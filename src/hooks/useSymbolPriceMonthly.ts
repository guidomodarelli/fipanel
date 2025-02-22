import { getSymbolPriceMonthly } from '@/app/setup';
import type { SymbolPriceInfo } from '@/core/contexts/Symbol/domain/SymbolPriceInfo';
import { DateUtils } from '@/lib/date';
import { useQuery } from '@tanstack/react-query';

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

  const getAnnualPrices = () => {
    return dataMonthly?.filter((price) => DateUtils.isDecember(price.date)) ?? [];
  };

  const getTheLastAnnualPrice = (): SymbolPriceInfo | undefined => {
    return getAnnualPrices()?.find((price) => DateUtils.isLastYear(price.date));
  };

  const getAnnualPriceArray = (): number[] => {
    return getAnnualPrices()?.map((price) => price.close) ?? [];
  };

  return {
    dataMonthly,
    getTheLastAnnualPrice,
    getAnnualPrices: getAnnualPriceArray,
    isLoading: isLoadingMonthly,
  };
};
