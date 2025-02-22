import type { VariableData } from './VariableData';

export type FinancialIndicators = Partial<
  Record<
    'TASA_POLITICA_MONETARIA' | 'IPC_MENSUAL' | 'IPC_INTERANUAL' | 'IPC_REM',
    VariableData
  >
>;
