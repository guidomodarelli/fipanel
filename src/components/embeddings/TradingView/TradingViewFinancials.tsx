'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import React, { useEffect } from 'react';

interface TradingViewFinancialsProps {
  symbol: string;
  locale?: string;
  colorTheme?: ColorTheme;
}

// Fundamental Data Widget: https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/
const TradingViewFinancials: React.FC<TradingViewFinancialsProps> = ({
  symbol,
  locale = 'es',
  colorTheme = 'light',
}) => {
  const tradingviewFinancialsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme,
      displayMode: 'regular',
      isTransparent: true,
      locale,
      showSymbolLogo: true,
      symbol,
      height: '100%',
      width: '100%',
    });

    if (tradingviewFinancialsRef.current) {
      tradingviewFinancialsRef.current.innerHTML = '';
      tradingviewFinancialsRef.current.appendChild(script);
    }

    return () => {
      if (tradingviewFinancialsRef.current) {
        tradingviewFinancialsRef.current.innerHTML = '';
      }
    };
  }, [symbol, locale, colorTheme]);

  return <div className='h-[25rem]' ref={tradingviewFinancialsRef} />;
};

export default TradingViewFinancials;
