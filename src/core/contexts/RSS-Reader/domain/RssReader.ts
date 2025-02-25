import type { RssFeedMetadata } from './RssDataStructure';

export interface RssReader {
  readFrom(url: string): Promise<RssFeedMetadata>;
}
