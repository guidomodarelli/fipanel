import { Money } from './Money';

export type DolarMap = Partial<Record<'oficial' | 'mep' | 'ccl' | 'blue', Money>>;
