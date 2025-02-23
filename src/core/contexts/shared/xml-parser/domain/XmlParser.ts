export interface XmlParser {
  parse<T>(XMLdata: string): T;
}
