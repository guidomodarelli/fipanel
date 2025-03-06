import type { AutocompleteItemType } from '@/typings/AutocompleteItemType';

export const MARKET_LABEL = 'Mercado';
export const SYMBOL_LABEL = 'Símbolo';

export const MARKETS: AutocompleteItemType[] = [
  { key: 'NASDAQ', label: 'USA - Nasdaq' },
  { key: 'NYSE', label: 'USA - NYSE' },
  { key: 'BCBA', label: 'Argentina - BCBA' },
  { key: 'LSE', label: 'UK - London Stock Exchange (LSE)' },
  { key: 'JPX', label: 'Japan - Tokyo Stock Exchange (JPX)' },
  { key: 'HKEX', label: 'Hong Kong - HKEX' },
  { key: 'TSX', label: 'Canada - Toronto Stock Exchange (TSX)' },
  { key: 'EURONEXT', label: 'Europe - Euronext' },
  { key: 'ASX', label: 'Australia - ASX' },
  { key: 'BSE', label: 'India - Bombay Stock Exchange (BSE)' },
];
