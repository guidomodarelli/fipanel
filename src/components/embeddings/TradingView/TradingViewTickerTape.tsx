'use client';
import React, { useEffect } from 'react';

// Ticker Widget Editor: https://www.tradingview.com/widget-docs/widgets/tickers/ticker/
export const TradingViewTickerTape = () => {
  const tradingviewTickerTapeRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: 'Oro',
          proName: 'OANDA:XAUUSD',
        },
        {
          description: 'S&P 500',
          proName: 'CAPITALCOM:US500',
        },
        {
          description: 'Nasdaq',
          proName: 'CAPITALCOM:US100',
        },
        {
          description: 'Visa',
          proName: 'NYSE:V',
        },
        {
          description: 'Mastercard',
          proName: 'NYSE:MA',
        },
        {
          description: 'Amazon',
          proName: 'NASDAQ:AMZN',
        },
        {
          description: 'Alphabet',
          proName: 'NASDAQ:GOOGL',
        },
        {
          description: 'Meta',
          proName: 'NASDAQ:META',
        },
        {
          description: 'Microsoft',
          proName: 'NASDAQ:MSFT',
        },
        {
          description: 'Tesla',
          proName: 'NASDAQ:TSLA',
        },
        {
          description: 'Ferrari',
          proName: 'NYSE:RACE',
        },
        {
          description: 'ASML',
          proName: 'NASDAQ:ASML',
        },
        {
          description: 'Semiconductores de Taiwán',
          proName: 'NYSE:TSM',
        },
        {
          description: 'Mercado Libre',
          proName: 'NASDAQ:MELI',
        },
        {
          description: 'Merval',
          proName: 'INDEX:IAR',
        },
        {
          description: 'ETF Argentina',
          proName: 'AMEX:ARGT',
        },
        {
          description: 'YPF',
          proName: 'NYSE:YPF',
        },
        {
          description: 'Mercado Brasil',
          proName: 'AMEX:EWZ',
        },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'regular',
      colorTheme: 'light',
      locale: 'es',
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

  return <div ref={tradingviewTickerTapeRef} />;
};
