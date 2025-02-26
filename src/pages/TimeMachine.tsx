'use client';
import { createLogger } from '@/app/setup';
import type { TimeMachineData } from '@/components/TimeMachine/TimeMachineData';
import TimeMachineForm from '@/components/TimeMachine/TimeMachineForm';
import TimeMachineTable from '@/components/TimeMachine/TimeMachineTable';
import type { TimeMachineScheme } from '@/components/TimeMachine/TimeMachineScheme';
import { useSymbolPriceMonthly } from '@/hooks/useSymbolPriceMonthly';
import { useEffect, useState } from 'react';

function analyzePriceVariations(
  priceHistory: number[],
  initialInvestmentAmount: number,
  annualInvestmentInjection: number,
): TimeMachineData[] {
  const datos: TimeMachineData[] = [
    {
      key: 0,
      year: new Date().getFullYear(),
      price: priceHistory[0],
      varPercent: 0,
      invested: initialInvestmentAmount,
      saved: initialInvestmentAmount,
      total: initialInvestmentAmount,
    },
  ];
  let capitalInvestmentBalance = initialInvestmentAmount;
  let capitalAhorrado = initialInvestmentAmount;
  let totalCapitalAccumulated = initialInvestmentAmount;
  const currentYear = new Date().getFullYear();

  for (let i = 1; i < priceHistory.length; i++) {
    const year = currentYear - (priceHistory.length - i - 1);
    const priceVariationPercentage = (priceHistory[i] - priceHistory[i - 1]) / priceHistory[i - 1];

    capitalInvestmentBalance = capitalInvestmentBalance * (1 + priceVariationPercentage);
    capitalAhorrado += annualInvestmentInjection;
    totalCapitalAccumulated = (totalCapitalAccumulated + annualInvestmentInjection) * (1 + priceVariationPercentage);

    datos.push({
      key: i,
      year,
      price: priceHistory[i],
      varPercent: Number.parseFloat((priceVariationPercentage * 100).toFixed(2)),
      invested: Number.parseFloat(capitalInvestmentBalance.toFixed(2)),
      saved: Number.parseFloat(capitalAhorrado.toFixed(2)),
      total: Number.parseFloat(totalCapitalAccumulated.toFixed(2)),
    });
  }

  return datos;
}

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const from = new Date(today.getFullYear() - values.yearsOfInvestment, 0, 1);
    setSymbol(values.symbol);
    setFrom(from);
    setTo(today);
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
