import type { RssFeedItem as RssFeedItemType } from '@/core/contexts/RSS-Reader/domain/RssDataStructure';
import type React from 'react';
import { useEffect, useState } from 'react';

interface RssFeedItemProps extends RssFeedItemType {}

export const RssFeedItem: React.FC<RssFeedItemProps> = (props) => {
  const [description, setDescription] = useState(props.description);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.description, 'text/html');
    setDescription(doc.body.innerHTML); // Changed from doc.toString() to doc.body.innerHTML
  }, [props.description]);

  return (
    <div className='flex flex-col gap-2 bg-gray-50 p-6 rounded-2xl shadow-md'>
      <h2 className='text-xl font-bold'>{props.title}</h2>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml:  */}
      <div className='rss-rendered-element' dangerouslySetInnerHTML={{ __html: description }} />
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
