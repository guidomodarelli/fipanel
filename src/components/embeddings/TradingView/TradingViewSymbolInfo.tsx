'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import React, { useEffect } from 'react';

interface TradingViewSymbolInfoProps {
  symbol: string;
  locale?: string;
  colorTheme?: ColorTheme;
}

// Symbol Info Widget: https://www.tradingview.com/widget-docs/widgets/symbol-details/company-profile/
const TradingViewSymbolInfo: React.FC<TradingViewSymbolInfoProps> = ({
  symbol,
  locale = 'es',
  colorTheme = 'light',
}) => {
  const tradingviewSymbolInfoRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme,
      isTransparent: true,
      locale,
      symbol,
      width: '100%',
      height: '100%',
      autosize: true,
    });

    if (tradingviewSymbolInfoRef.current) {
      tradingviewSymbolInfoRef.current.innerHTML = '';
      tradingviewSymbolInfoRef.current.appendChild(script);
    }

    return () => {
      if (tradingviewSymbolInfoRef.current) {
        tradingviewSymbolInfoRef.current.innerHTML = '';
      }
    };
  }, [symbol, locale, colorTheme]);

  return <div ref={tradingviewSymbolInfoRef} />;
};

export default TradingViewSymbolInfo;
