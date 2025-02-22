'use client';
import { InvestmentProjectionData } from '@/components/form/InvestmentProjection/InvestmentProjectionData';
import InvestmentProjectionForm from '@/components/form/InvestmentProjection/InvestmentProjectionForm';
import InvestmentProjectionTable from '@/components/form/InvestmentProjection/InvestmentProjectionTable';
import type { InvestmentProjection } from '@/components/form/InvestmentProjection/scheme';
import { useSymbolPriceMonthly } from '@/hooks/useSymbolPriceMonthly';
import { useEffect, useState } from 'react';
import { _logger } from '../setup';

function analyzePriceVariations(
  precios: number[],
  capitalInicial: number,
  inyeccionMensual: number,
): InvestmentProjectionData[] {
  const datos: InvestmentProjectionData[] = [];
  let capitalInvertido = capitalInicial;
  let capitalAhorrado = capitalInicial;
  let capitalInvertidoYAhorrado = capitalInicial;
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < precios.length; i++) {
    const year = currentYear - (precios.length - i - 1);
    const varPercent = i === 0 ? 0 : (precios[i] - precios[i - 1]) / precios[i - 1];

    capitalInvertido = i === 0 ? capitalInicial : capitalInvertido * (1 + varPercent);

    capitalAhorrado = i === 0 ? capitalInicial : capitalAhorrado + inyeccionMensual;

    capitalInvertidoYAhorrado =
      i === 0 ? capitalInicial : (capitalInvertidoYAhorrado + inyeccionMensual) * (1 + varPercent);

    datos.push({
      key: i,
      year,
      price: precios[i],
      varPercent: Number.parseFloat((varPercent * 100).toFixed(2)),
      invested: Number.parseFloat(capitalInvertido.toFixed(2)),
      saved: Number.parseFloat(capitalAhorrado.toFixed(2)),
      total: Number.parseFloat(capitalInvertidoYAhorrado.toFixed(2)),
    });
  }

  return datos;
}

const Projection = () => {
  const logger = _logger.get('Projection');
  const [symbol, setSymbol] = useState('');
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyInjection, setMonthlyInjection] = useState(0);
  const [from, setFrom] = useState<Date>(new Date('1990-01-01'));
  const [to, setTo] = useState<Date>(new Date());
  const [data, setData] = useState<InvestmentProjectionData[]>([]);
  const { isLoading, getAnnualPrices } = useSymbolPriceMonthly({
    symbol,
    from,
    to,
  });

  const handleSubmit = (values: InvestmentProjection) => {
    setSymbol(values.symbol);
    logger.debug('Investment projection for symbol:', values.symbol);
    if (values.yearsOfInvestment) {
      logger.debug('Investment projection for', values.yearsOfInvestment, 'years');
      // set from and to dates using values.yearsOfInvestment
      const today = new Date();
      const from = new Date(today.getFullYear() - values.yearsOfInvestment, 0, 1);
      setFrom(from);
      setTo(today);
    }
    setInitialInvestment(values.initialInvestment);
    setMonthlyInjection(values.monthlyInjection);
  };

  useEffect(() => {
    if (getAnnualPrices.length && initialInvestment && monthlyInjection) {
      logger.debug('Investment projection updated for symbol:', symbol);
      const data = analyzePriceVariations(getAnnualPrices, initialInvestment, monthlyInjection);
      setData(data);
    }
  }, [symbol, getAnnualPrices, initialInvestment, monthlyInjection]);

  return (
    <div className='flex gap-8'>
      <InvestmentProjectionForm onSubmit={handleSubmit} />
      <InvestmentProjectionTable data={data} />
    </div>
  );
};

export default Projection;
