'use client';
import DolarCard from '@/components/cards/DolarCard/DolarCard';
import IPCCard from '@/components/cards/IPCCard/IPCCard';
import InterestRateCard from '@/components/cards/InterestRateCard/InterestRateCard';
import { RssFeedMetadata } from '@/components/rss/RssFeedMetadata';
import { SIDEBAR_TRIGGER_HEIGHT } from '@/components/sidebar/SidebarLayout';
import type { RssFeedMetadata as RssFeedMetadataType } from '@/core/contexts/RSS-Reader/domain/RssDataStructure';
import { useEffect, useState } from 'react';
import { CLARIN_ECONOMY_RSS } from './constants';
import { createLogger, rssReader } from './setup';

export default function Home() {
  const logger = createLogger(Home, 'enabled');
  // @ts-expect-error
  const [data, setData] = useState<RssFeedMetadataType>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await rssReader.readFrom(`/api/rss?url=${CLARIN_ECONOMY_RSS}`);
        setData(data);
        logger.debug(data);
      } catch (error) {
        logger.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={'flex flex-col gap-4 items-center'} style={{ height: `calc(100% - ${SIDEBAR_TRIGGER_HEIGHT})` }}>
      <div className='flex gap-4 flex-col md:flex-row'>
        <IPCCard />
        <DolarCard />
        <InterestRateCard />
      </div>
      {data && <RssFeedMetadata className='mt-6' {...data} />}
    </div>
  );
}
