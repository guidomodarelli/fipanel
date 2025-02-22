'use client';
import InvestmentProjectionForm from '@/components/form/InvestmentProjection/InvestmentProjectionForm';
import InvestmentProjectionTable from '@/components/form/InvestmentProjection/InvestmentProjectionTable';
import type { InvestmentProjection } from '@/components/form/InvestmentProjection/scheme';
import { useSymbolPriceMonthly } from '@/hooks/useSymbolPriceMonthly';
import { useEffect, useState } from 'react';
import { _logger } from '../setup';

interface YearData {
  year: number;
  price: number;
  varPercent: number;
  capitalInvertido: number;
  capitalAhorrado: number;
  capitalInvertidoYAhorrado: number;
}

function analyzePriceVariations(precios: number[], capitalInicial: number, inyeccionMensual: number): YearData[] {
  const datos: YearData[] = [];
  let capitalInvertido = capitalInicial;
  let capitalAhorrado = capitalInicial;
  let capitalInvertidoYAhorrado = capitalInicial;

  for (let i = 0; i < precios.length; i++) {
    const year = 2000 + i;
    const varPercent = i === 0 ? 0 : (precios[i] - precios[i - 1]) / precios[i - 1];

    capitalInvertido = i === 0 ? capitalInicial : capitalInvertido * (1 + varPercent);

    capitalAhorrado = i === 0 ? capitalInicial : capitalAhorrado + inyeccionMensual;

    capitalInvertidoYAhorrado =
      i === 0 ? capitalInicial : (capitalInvertidoYAhorrado + inyeccionMensual) * (1 + varPercent);

    datos.push({
      year,
      price: precios[i],
      varPercent: Number.parseFloat((varPercent * 100).toFixed(2)),
      capitalInvertido: Number.parseFloat(capitalInvertido.toFixed(2)),
      capitalAhorrado: Number.parseFloat(capitalAhorrado.toFixed(2)),
      capitalInvertidoYAhorrado: Number.parseFloat(capitalInvertidoYAhorrado.toFixed(2)),
    });
  }

  return datos;
}

const Projection = () => {
  const [symbol, setSymbol] = useState('');
  const { isLoading, getTheLastAnnualPrice } = useSymbolPriceMonthly({ symbol });

  const handleSubmit = (values: InvestmentProjection) => {
    if (values.symbol) {
      setSymbol(values.symbol);
    }
  };

  return (
    <div className='flex gap-8'>
      <InvestmentProjectionForm onSubmit={handleSubmit} />
      <InvestmentProjectionTable data={[]} />
    </div>
  );
};

export default Projection;
