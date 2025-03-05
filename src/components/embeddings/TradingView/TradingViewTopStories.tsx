'use client';
import type { ColorTheme } from '@/typings/ColorTheme';
import { type FC, useEffect, useRef } from 'react';

const FeedMode = {
  AllSymbols: 'all_symbols',
  Market: 'market',
  Symbol: 'symbol',
} as const;

type Market = 'crypto' | 'forex' | 'stock' | 'index' | 'futures' | 'cfd';
type DisplayMode = 'adaptive' | 'regular' | 'compact';

interface TradingViewTopStoriesPropsAllSymbols {
  feedMode: (typeof FeedMode)['AllSymbols'];
}

interface TradingViewTopStoriesPropsMarket {
  feedMode: (typeof FeedMode)['Market'];
  market: Market;
}

interface TradingViewTopStoriesPropsSymbol {
  feedMode: (typeof FeedMode)['Symbol'];
  symbol: string;
}

type TradingViewTopStoriesProps = {
  colorTheme?: ColorTheme;
  locale?: string;
  market?: Market;
  displayMode?: DisplayMode;
} & (TradingViewTopStoriesPropsAllSymbols | TradingViewTopStoriesPropsSymbol | TradingViewTopStoriesPropsMarket);

// Top Stories Widget: https://www.tradingview.com/widget-docs/widgets/news/top-stories/
const TradingViewTopStories: FC<TradingViewTopStoriesProps> = ({
  feedMode = 'market',
  colorTheme = 'light',
  locale = 'en',
  market = 'stock',
  displayMode = 'regular',
}) => {
  const tradingviewTimelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode,
      isTransparent: false,
      displayMode,
      width: '100%',
      height: '100%',
      colorTheme,
      locale,
      market,
    });

    if (tradingviewTimelineRef.current) {
      tradingviewTimelineRef.current.innerHTML = '';
      tradingviewTimelineRef.current.appendChild(script);
      tradingviewTimelineRef.current.style.minHeight = '650px';
      tradingviewTimelineRef.current.style.height = '100%';
      tradingviewTimelineRef.current.style.width = '100%';
    }

    return () => {
      if (tradingviewTimelineRef.current) {
        tradingviewTimelineRef.current.innerHTML = '';
      }
    };
  }, [feedMode, colorTheme, locale, market, displayMode]);

  return <div ref={tradingviewTimelineRef} />;
};

export default TradingViewTopStories;
