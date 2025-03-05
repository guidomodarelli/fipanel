'use client';
import { createLogger } from '@/app/setup';
import TradingViewFinancials from '@/components/embeddings/TradingView/TradingViewFinancials';
import TradingViewSymbolInfo from '@/components/embeddings/TradingView/TradingViewSymbolInfo';
import TradingViewSymbolProfile from '@/components/embeddings/TradingView/TradingViewSymbolProfile';
import TradingViewTechnicalAnalysis from '@/components/embeddings/TradingView/TradingViewTechnicalAnalysis';
import TradingViewTopStories from '@/components/embeddings/TradingView/TradingViewTopStories';
import { useState } from 'react';
import BusinessAnalyzerForm, { DEBUG_VALUES } from './BusinessAnalyzerForm';
import type { BusinessAnalyzerScheme } from './BusinessAnalyzerScheme';

export default function BusinessAnalyzer() {
  const logger = createLogger('BusinessAnalyzer', 'enabled');
  const [symbol, setSymbol] = useState<string>(DEBUG_VALUES.symbol);
  const [market, setMarket] = useState<string>(DEBUG_VALUES.market);

  const onSubmit = (data: BusinessAnalyzerScheme) => {
    logger.debug('Submitted data:', data);
    setSymbol(data.symbol);
    setMarket(data.market);
  };

  return (
    <>
      <BusinessAnalyzerForm onSubmit={onSubmit} />
      <div className='mt-8'>
        <TradingViewSymbolInfo symbol={`${market}:${symbol}`} />
        <TradingViewSymbolProfile symbol={`${market}:${symbol}`} />
        <TradingViewFinancials symbol={`${market}:${symbol}`} />
        <TradingViewTechnicalAnalysis symbol={`${market}:${symbol}`} />
        <TradingViewTopStories feedMode='symbol' symbol={`${market}:${symbol}`} />
      </div>
    </>
  );
}
