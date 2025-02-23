import { XMLParser } from 'fast-xml-parser';
import type { XmlParser } from '../domain/XmlParser';

export class FastXmlParser implements XmlParser {
  private parser = new XMLParser();

  public parse<T>(XMLdata: string): T {
    return this.parser.parse(XMLdata);
  }
}
