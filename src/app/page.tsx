'use client';
import DolarCard from '@/components/cards/DolarCard/DolarCard';
import IPCCard from '@/components/cards/IPCCard/IPCCard';
import InterestRateCard from '@/components/cards/InterestRateCard/InterestRateCard';
import { RssFeedMetadata } from '@/components/rss/RssFeedMetadata';
import { SIDEBAR_TRIGGER_HEIGHT } from '@/components/sidebar/SidebarLayout';
import { CLARIN_ECONOMY_RSS } from './constants';
import { createLogger } from './setup';

export default function Home() {
  const logger = createLogger('Home', 'enabled');
  return (
    <div className={'flex flex-col gap-4 items-center'} style={{ height: `calc(100% - ${SIDEBAR_TRIGGER_HEIGHT})` }}>
      <div className='flex gap-4 flex-col md:flex-row'>
        <IPCCard />
        <DolarCard />
        <InterestRateCard />
      </div>
      <RssFeedMetadata className='mt-6' logger={logger.getLogger(['RssFeedMetadata'])} url={CLARIN_ECONOMY_RSS} />
    </div>
  );
}
