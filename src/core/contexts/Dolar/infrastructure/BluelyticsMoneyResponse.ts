export interface BluelyticsValueResponse {
  value_buy: number;
  value_sell: number;
  value_avg: number;
}

export interface BluelyticsDolarResponse {
  oficial: BluelyticsValueResponse;
  blue: BluelyticsValueResponse;
}
