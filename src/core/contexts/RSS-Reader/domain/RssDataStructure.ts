interface RssFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  category: string[];
}

interface RssImageMetadata {
  url: string;
  title: string;
  link: string;
  width: string;
  height: string;
}

export interface RssFeedMetadata {
  title: string;
  link: string;
  description: string;
  item: RssFeedItem[];
  image?: RssImageMetadata;
}

interface RssFeedChannel {
  channel: RssFeedMetadata;
}

export interface RssDataStructure {
  rss: RssFeedChannel;
}
