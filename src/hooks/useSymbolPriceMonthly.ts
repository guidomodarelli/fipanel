import { getSymbolPriceMonthly } from '@/app/setup';
import type { SymbolPriceInfo } from '@/core/contexts/Symbol/domain/SymbolPriceInfo';
import { DateUtils } from '@/lib/date';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

interface SymbolPriceMonthlyProps {
  symbol: string;
  from?: Date;
  to?: Date;
}

export const useSymbolPriceMonthly = ({ symbol, from, to }: SymbolPriceMonthlyProps) => {
  const fromYear = from?.getFullYear();
  const toYear = to?.getFullYear();

  const { data: dataMonthly, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['symbolPriceMonthly', symbol, fromYear, toYear],
    queryFn: () => {
      if (!symbol || !from || !to) return [];
      return getSymbolPriceMonthly(symbol, from, to);
    },
  });

  const isDecember = useCallback((price: SymbolPriceInfo) => DateUtils.isDecember(price.date), []);

  const isLastYear = useCallback((price: SymbolPriceInfo) => DateUtils.isLastYear(price.date), []);

  const getAnnualPrices = useMemo(() => dataMonthly?.filter(isDecember) ?? [], [dataMonthly, isDecember]);

  const getTheLastAnnualPrice = useCallback(
    (): SymbolPriceInfo | undefined => getAnnualPrices.find(isLastYear),
    [getAnnualPrices, isLastYear],
  );

  const annualClosePriceArray = useMemo((): number[] => getAnnualPrices.map((price) => price.close), [getAnnualPrices]);

  return {
    dataMonthly,
    getTheLastAnnualPrice,
    getAnnualPrices: annualClosePriceArray,
    isLoading: isLoadingMonthly,
  };
};
