'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import React, { useEffect } from 'react';

interface TradingViewTechnicalAnalysisProps {
  symbol: string;
  interval?: string;
  locale?: string;
  colorTheme?: ColorTheme;
  showIntervalTabs?: boolean;
  displayMode?: 'single' | 'compact';
}

// Technical Analysis Widget: https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/
const TradingViewTechnicalAnalysis: React.FC<TradingViewTechnicalAnalysisProps> = ({
  symbol,
  interval = '1M',
  locale = 'es',
  colorTheme = 'light',
  showIntervalTabs = true,
  displayMode = 'multiple',
}) => {
  const tradingviewTechnicalAnalysisRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval,
      width: '100%',
      isTransparent: true,
      height: '100%',
      symbol,
      showIntervalTabs,
      displayMode,
      locale,
      colorTheme,
    });

    if (tradingviewTechnicalAnalysisRef.current) {
      tradingviewTechnicalAnalysisRef.current.innerHTML = '';
      tradingviewTechnicalAnalysisRef.current.appendChild(script);
    }

    return () => {
      if (tradingviewTechnicalAnalysisRef.current) {
        tradingviewTechnicalAnalysisRef.current.innerHTML = '';
      }
    };
  }, [symbol, interval, locale, colorTheme, showIntervalTabs, displayMode]);

  return <div className='h-[550px]' ref={tradingviewTechnicalAnalysisRef} />;
};

export default TradingViewTechnicalAnalysis;
