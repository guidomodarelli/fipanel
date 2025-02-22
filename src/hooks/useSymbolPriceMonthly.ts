import { getSymbolPriceMonthly } from '@/app/setup';
import type { SymbolPriceInfo } from '@/core/contexts/Symbol/domain/SymbolPriceInfo';
import { DateUtils } from '@/lib/date';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

interface SymbolPriceMonthlyProps {
  symbol: string;
  from: Date;
  to: Date;
}

export const useSymbolPriceMonthly = ({ symbol, from, to }: SymbolPriceMonthlyProps) => {
  const { data: dataMonthly, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['symbolPriceMonthly', symbol, from, to],
    enabled: !!symbol && !!from && !!to,
    queryFn: () => getSymbolPriceMonthly(symbol, from, to),
  });

  const isDecember = (price: SymbolPriceInfo) => DateUtils.isDecember(price.date);

  const isLastYear = (price: SymbolPriceInfo) => DateUtils.isLastYear(price.date);

  const getAnnualPrices = useMemo(() => dataMonthly?.filter(isDecember) ?? [], [dataMonthly, symbol, from, to]);

  const getTheLastAnnualPrice = useCallback(
    (): SymbolPriceInfo | undefined => getAnnualPrices.find(isLastYear),
    [getAnnualPrices],
  );

  const annualClosePriceArray = useMemo((): number[] => getAnnualPrices.map((price) => price.close), [getAnnualPrices]);

  return {
    dataMonthly,
    getTheLastAnnualPrice,
    getAnnualPrices: annualClosePriceArray,
    isLoading: isLoadingMonthly,
  };
};
