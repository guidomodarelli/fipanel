import type { RssFeedMetadata as RssFeedMetadataType } from '@/core/contexts/RSS-Reader/domain/RssDataStructure';
import type React from 'react';
import { RssFeedItem } from './RssFeedItem';

interface RssFeedMetadataProps extends RssFeedMetadataType {
  className?: string;
}

export const RssFeedMetadata: React.FC<RssFeedMetadataProps> = (props) => {
  return (
    <article className={props.className}>
      <h1 className='text-2xl font-bold mb-4'>{props.title}</h1>
      {props.item && (
        <div className='flex flex-col gap-4'>
          {props.item.map((item) => (
            <RssFeedItem key={item.guid} {...item} />
          ))}
        </div>
      )}
    </article>
  );
};
