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
  displayMode?: DisplayMode;
} & (TradingViewTopStoriesPropsAllSymbols | TradingViewTopStoriesPropsSymbol | TradingViewTopStoriesPropsMarket);

// Top Stories Widget: https://www.tradingview.com/widget-docs/widgets/news/top-stories/
const TradingViewTopStories: FC<TradingViewTopStoriesProps> = ({ ...props }) => {
  props.colorTheme ||= 'light';
  props.locale ||= 'es';
  props.displayMode ||= 'regular';
  const tradingviewTimelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      isTransparent: false,
      width: '100%',
      height: window.innerHeight,
      ...props,
    });

    if (tradingviewTimelineRef.current) {
      tradingviewTimelineRef.current.innerHTML = '';
      tradingviewTimelineRef.current.appendChild(script);
    }

    return () => {
      if (tradingviewTimelineRef.current) {
        tradingviewTimelineRef.current.innerHTML = '';
      }
    };
  }, [JSON.stringify(props), window.innerHeight]);

  return <div className='h-[50rem]' ref={tradingviewTimelineRef} />;
};

export default TradingViewTopStories;
