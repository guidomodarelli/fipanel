export interface SymbolMetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

export interface SymbolMonthlyTimeSeries {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export interface SymbolPriceMonthlyResponse {
  'Meta Data': SymbolMetaData;
  'Monthly Time Series': Record<string, SymbolMonthlyTimeSeries>;
}
