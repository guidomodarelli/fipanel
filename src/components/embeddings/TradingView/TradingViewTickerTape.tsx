'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import React, { useEffect } from 'react';

export const TICKER_TAPE_HEIGHT = 44;

export interface Symbol {
  description: string;
  proName: string;
}

interface TradingViewTickerTapeProps {
  symbols: Symbol[];
  locale?: string;
  colorTheme?: ColorTheme;
}

// Ticker Widget Editor: https://www.tradingview.com/widget-docs/widgets/tickers/ticker/
export const TradingViewTickerTape: React.FC<TradingViewTickerTapeProps> = ({
  symbols = [],
  locale = 'es',
  colorTheme = 'light',
}) => {
  const tradingviewTickerTapeRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme,
      displayMode: 'regular',
      isTransparent: true,
      locale,
      showSymbolLogo: true,
      symbols,
    });

    if (tradingviewTickerTapeRef.current) {
      tradingviewTickerTapeRef.current.replaceWith(script);
    }

    return () => {
      if (tradingviewTickerTapeRef.current) {
        tradingviewTickerTapeRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div style={{ height: TICKER_TAPE_HEIGHT }}>
      <div ref={tradingviewTickerTapeRef} />
    </div>
  );
};
