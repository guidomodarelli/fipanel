import { getSymbolPriceMonthly } from '@/app/setup';
import { DateUtils } from '@/lib/date';
import { useQuery } from '@tanstack/react-query';

interface SymbolPriceMonthlyProps {
  symbol: string;
  from: Date;
  to: Date;
}

export const useSymbolPriceMonthly = ({
  symbol,
  from,
  to,
}: SymbolPriceMonthlyProps) => {
  const { data: dataMonthly, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['symbolPriceMonthly'],
    queryFn: () => getSymbolPriceMonthly(symbol, from, to),
  });

  const getAnnualPrices = () => {
    return dataMonthly?.filter((price) => DateUtils.isDecember(price.date));
  };

  const getTheLastAnnualPrice = () => {
    return getAnnualPrices()?.find((price) => DateUtils.isLastYear(price.date));
  };

  const getAnnualPriceArray = () => {
    return getAnnualPrices()?.map((price) => price.close);
  };

  return {
    dataMonthly,
    getTheLastAnnualPrice,
    getAnnualPrices: getAnnualPriceArray,
    isLoading: isLoadingMonthly,
  };
};
