'use client';
import { createLogger } from '@/app/setup';
import { useSymbolPriceMonthly } from '@/hooks/useSymbolPriceMonthly';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { TimeMachineChart } from './TimeMachineChart';
import type { TimeMachineData } from './TimeMachineData';
import TimeMachineForm from './TimeMachineForm';
import type { TimeMachineScheme } from './TimeMachineScheme';
import TimeMachineTable from './TimeMachineTable';
import { analyzePriceVariations } from './analyzePriceVariations';
import { INVESTED, I_S, SAVED } from './constants';
import type { Legend } from './types';

const legends: Legend[] = [
  { name: INVESTED, color: 'hsl(0,70%,40%)' },
  { name: SAVED, color: 'hsl(120,70%,40%)' },
  { name: I_S, color: 'hsl(240,70%,40%)' },
];

export const TimeMachine = () => {
  const logger = createLogger(TimeMachine.name, 'disabled');
  const [symbol, setSymbol] = useState('');
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [annualInjection, setAnnualInjection] = useState(0);
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [data, setData] = useState<TimeMachineData[]>([]);
  const { getAnnualPrices } = useSymbolPriceMonthly({
    symbol,
    from,
    to,
  });

  const handleSubmit = (values: TimeMachineScheme) => {
    logger.debug('Symbol:', values.symbol);
    logger.debug('Years of investment:', values.yearsOfInvestment, 'years');
    logger.debug('Initial investment:', values.initialInvestment);
    logger.debug('Annual injection:', values.annualInjection);
    const today = dayjs().startOf('day');
    const from = today.subtract(values.yearsOfInvestment, 'years').startOf('year');
    setSymbol(values.symbol);
    setFrom(from.toDate());
    setTo(today.toDate());
    setInitialInvestment(values.initialInvestment);
    setAnnualInjection(values.annualInjection);
  };

  const getYears = useCallback((from?: Date, to?: Date) => {
    if (!from || !to) return [];
    return Array.from({ length: to.getFullYear() - from.getFullYear() + 1 }, (_, i) => from.getFullYear() + i);
  }, []);

  const getInvestedSeries = useCallback((data: TimeMachineData[]) => {
    return data.map((item) => item.invested);
  }, []);

  const getSavedSeries = useCallback((data: TimeMachineData[]) => {
    return data.map((item) => item.saved);
  }, []);

  const getTotalSeries = useCallback((data: TimeMachineData[]) => {
    return data.map((item) => item.total);
  }, []);

  useEffect(() => {
    if (from && to) {
      const years = getYears(from, to);
      logger.debug('Years:', years);
    }
    logger.debug('Symbol:', symbol);
    logger.debug('Annual prices:', getAnnualPrices);
    logger.debug('Initial investment:', initialInvestment);
    logger.debug('Monthly injection:', annualInjection);
    logger.debug('From:', from?.toLocaleDateString());
    logger.debug('To:', to?.toLocaleDateString());
    if (getAnnualPrices.length && initialInvestment && annualInjection) {
      logger.debug('Analyzing price variations');
      const data = analyzePriceVariations(getAnnualPrices, initialInvestment, annualInjection);
      setData(data);
      logger.debug('Projection data set:', data);
    }
  }, [symbol, getAnnualPrices, initialInvestment, annualInjection]);

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-8 m-8'>
        <TimeMachineForm logger={logger.getLogger([TimeMachineForm.name])} onSubmit={handleSubmit} />
        <TimeMachineTable data={data} legends={legends} />
      </div>
      <TimeMachineChart
        legend={legends}
        logger={logger.getLogger([TimeMachineChart.name], 'disabled')}
        series={[getInvestedSeries(data), getSavedSeries(data), getTotalSeries(data)]}
        years={getYears(from, to)}
      />
    </>
  );
};
