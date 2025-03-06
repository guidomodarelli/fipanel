'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import React, { useEffect } from 'react';

interface TradingViewSymbolProfileProps {
  symbol: string;
  locale?: string;
  colorTheme?: ColorTheme;
}

// Symbol Profile Widget: https://www.tradingview.com/widget-docs/widgets/symbol-details/company-profile/
const TradingViewSymbolProfile: React.FC<TradingViewSymbolProfileProps> = ({
  symbol,
  locale = 'es',
  colorTheme = 'light',
}) => {
  const tradingviewSymbolProfileRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: '100%',
      isTransparent: true,
      colorTheme,
      symbol,
      locale,
    });

    if (tradingviewSymbolProfileRef.current) {
      tradingviewSymbolProfileRef.current.innerHTML = '';
      tradingviewSymbolProfileRef.current.appendChild(script);
    }

    return () => {
      if (tradingviewSymbolProfileRef.current) {
        tradingviewSymbolProfileRef.current.innerHTML = '';
      }
    };
  }, [symbol, locale, colorTheme]);

  return <div className='h-[12rem]' ref={tradingviewSymbolProfileRef} />;
};

export default TradingViewSymbolProfile;
