'use client';
import { createLogger } from '@/app/setup';
import type { TimeMachineData } from '@/components/TimeMachine/TimeMachineData';
import TimeMachineForm from '@/components/TimeMachine/TimeMachineForm';
import type { TimeMachineScheme } from '@/components/TimeMachine/TimeMachineScheme';
import TimeMachineTable from '@/components/TimeMachine/TimeMachineTable';
import { analyzePriceVariations } from '@/components/TimeMachine/analyzePriceVariations';
import { useSymbolPriceMonthly } from '@/hooks/useSymbolPriceMonthly';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const TimeMachine = () => {
  const logger = createLogger('Projection', 'disabled');
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

  useEffect(() => {
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
    <div className='flex gap-8'>
      <TimeMachineForm logger={logger.getLogger([TimeMachineForm.name])} onSubmit={handleSubmit} />
      <TimeMachineTable data={data} />
    </div>
  );
};
