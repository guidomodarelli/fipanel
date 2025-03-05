import { useEffect, useRef } from 'react';

export const TradingViewTopStories = () => {
  const tradingviewTimelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: 'market',
      isTransparent: false,
      displayMode: 'adaptive',
      width: '100%',
      height: '100%',
      colorTheme: 'light',
      locale: 'en',
      market: 'stock',
    });

    if (tradingviewTimelineRef.current) {
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
  }, []);

  return <div ref={tradingviewTimelineRef} />;
};
