export interface FinhubSymbolServiceResponse {
  // Open price of the day
  o: number;
  // Previous close price
  pc: number;
  // High price of the day
  h: number;
  // Low price of the day
  l: number;
  // Current price
  c: number;
  // Change
  d: number;
  // Percent change
  dp: number;
  // Timestamp
  t: number;
}
