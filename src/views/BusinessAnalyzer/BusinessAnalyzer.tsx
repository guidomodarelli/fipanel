'use client';
import TradingViewFinancials from '@/components/embeddings/TradingView/TradingViewFinancials';
import { useState } from 'react';
import BusinessAnalyzerForm, { DEBUG_VALUES } from './BusinessAnalyzerForm';
import type { BusinessAnalyzerScheme } from './BusinessAnalyzerScheme';

export default function BusinessAnalyzer() {
  const [symbol, setSymbol] = useState<string>(DEBUG_VALUES.symbol);

  const onSubmit = (data: BusinessAnalyzerScheme) => {
    console.log('Submitted data:', data);
    setSymbol(data.symbol);
  };

  return (
    <>
      <BusinessAnalyzerForm onSubmit={onSubmit} />
      <TradingViewFinancials symbol={symbol} />
    </>
  );
}
