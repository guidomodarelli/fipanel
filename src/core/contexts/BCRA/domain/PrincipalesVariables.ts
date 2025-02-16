import { Variable } from './Variable';

export type PrincipalesVariables = Partial<Record<
  'TASA_POLITICA_MONETARIA' | 'IPC_MENSUAL' | 'IPC_INTERANUAL' | 'IPC_REM',
  Variable
>>;
