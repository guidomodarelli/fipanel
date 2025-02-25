'use client';
import { rssReader } from '@/app/setup';
import type { RssFeedMetadata as RssFeedMetadataType } from '@/core/contexts/RSS-Reader/domain/RssDataStructure';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import type React from 'react';
import { useEffect, useState } from 'react';
import { RssFeedItem } from './RssFeedItem';

interface RssFeedMetadataProps {
  className?: string;
  url: string;
  logger: Logger;
}

export const RssFeedMetadata: React.FC<RssFeedMetadataProps> = ({ className, url, logger }) => {
  const [data, setData] = useState({} as RssFeedMetadataType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await rssReader.readFrom(`/api/rss?url=${url}`);
        setData(data);
        logger.debug(data);
      } catch (error) {
        logger.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <article className={className}>
      <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
      {data.item && (
        <div className='flex flex-col gap-4'>
          {data.item.map((item) => (
            <RssFeedItem key={item.guid} {...item} />
          ))}
        </div>
      )}
    </article>
  );
};
