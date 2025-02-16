import { getSymbolPriceMonthly } from '@/app/setup';
import { useQuery } from '@tanstack/react-query';

interface SymbolPriceMonthlyProps {
  symbol: string;
}
export const useSymbolPriceMonthly = ({ symbol }: SymbolPriceMonthlyProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['symbolPriceMonthly'],
    queryFn: () => getSymbolPriceMonthly(symbol),
  });

  const isDecember = (date: Date) => {
    return date.getMonth() === 12;
  };

  const isLastYear = (date: Date) => {
    return date.getFullYear() === new Date().getFullYear() - 1;
  };

  const getTheLastAnnualPrice = () => {
    return data?.find((price) => isLastYear(price.date) && isDecember(price.date));
  };

  const getTheLastPrice = () => {
    return data?.at(0);
  };

  return {
    data,
    getTheLastAnnualPrice,
    getTheLastPrice,
    isLoading,
  };
};
