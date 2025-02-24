import type { RssFeedItem as RssFeedItemType } from '@/core/contexts/RSS-Reader/domain/RssDataStructure';
import type React from 'react';

interface RssFeedItemProps extends RssFeedItemType {}

export const RssFeedItem: React.FC<RssFeedItemProps> = (props) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-xl font-bold'>{props.title}</h2>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml:  */}
      <div dangerouslySetInnerHTML={{ __html: props.description }} />
      {props.category && props.category.length > 0 && (
        <div className='flex flex-wrap'>
          {props.category.map((cat) => (
            <span className='mr-2 text-sm text-gray-500' key={cat}>
              {cat}
            </span>
          ))}
        </div>
      )}
      {props.pubDate && <p className='text-gray-400 text-sm'>{props.pubDate}</p>}
    </div>
  );
};
