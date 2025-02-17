import { FinancialValues } from './FinancialValues';

export type DolarPriceMap = Partial<Record<'oficial' | 'mep' | 'ccl' | 'blue', FinancialValues>>;
