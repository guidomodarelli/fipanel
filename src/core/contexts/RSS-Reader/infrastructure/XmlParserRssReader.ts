import type { HttpService } from '../../shared/http/domain/HttpService';
import type { XmlParser } from '../../shared/xml-parser/domain/XmlParser';
import type { RssDataStructure, RssFeedMetadata } from '../domain/RssDataStructure';

export class XmlParserRssReader {
  constructor(
    private xmlParser: XmlParser,
    private httpService: HttpService,
  ) {}

  public async readFrom(url: string): Promise<RssFeedMetadata> {
    const dataXML = await this.httpService.get<string>(`https://cors-anywhere.herokuapp.com/${url}`, {
      raw: true,
      headers: { 'Content-Type': 'text/xml' },
    });
    return this.xmlParser.parse<RssDataStructure>(dataXML).rss.channel;
  }
}
