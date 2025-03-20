'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import React, { useEffect } from 'react';

interface TradingViewScreenerProps {
  market?: string;
  locale?: string;
  colorTheme?: ColorTheme;
  defaultColumn?: string;
  defaultScreen?: string;
  showToolbar?: boolean;
}

// Screener Widget: https://www.tradingview.com/widget-docs/widgets/screeners/
const TradingViewScreener: React.FC<TradingViewScreenerProps> = ({
  market = 'america',
  locale = 'es',
  colorTheme = 'light',
  defaultColumn = 'income_statement',
  defaultScreen = 'most_capitalized',
  showToolbar = true,
}) => {
  const tradingviewScreenerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: '100%',
      defaultColumn,
      defaultScreen,
      market,
      showToolbar,
      colorTheme,
      locale,
    });

    if (tradingviewScreenerRef.current) {
      tradingviewScreenerRef.current.innerHTML = '';
      tradingviewScreenerRef.current.appendChild(script);
    }

    return () => {
      if (tradingviewScreenerRef.current) {
        tradingviewScreenerRef.current.innerHTML = '';
      }
    };
  }, [market, locale, colorTheme, defaultColumn, defaultScreen, showToolbar]);

  return <div className='h-[25rem]' ref={tradingviewScreenerRef} />;
};

export default TradingViewScreener;
