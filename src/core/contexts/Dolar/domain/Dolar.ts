import { DolarMap } from './DolarMap';

export interface Dolar {
  getDolars(): Promise<DolarMap>;
}
