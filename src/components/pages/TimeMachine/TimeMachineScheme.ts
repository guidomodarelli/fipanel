import { z } from 'zod';

export const YEARS_OF_INVESTMENT_LABEL = 'Años de inversión';
export const INITIAL_INVESTMENT_LABEL = 'Inversión inicial';
export const ANNUAL_INJECTION_LABEL = 'Inyección Anual';
export const SYMBOL_LABEL = 'Símbolo';
const SYMBOL_MIN_LENGTH = 2;
const YEARS_OF_INVESTMENT_MIN = 1;
const YEARS_OF_INVESTMENT_MAX = 20;
const INITIAL_INVESTMENT_MIN = 1;
const ANNUAL_INJECTION_MIN = 1;

export const scheme = z.object({
  yearsOfInvestment: z
    .number({
      required_error: `${YEARS_OF_INVESTMENT_LABEL} es obligatorio`,
      invalid_type_error: `${YEARS_OF_INVESTMENT_LABEL} debe ser un número`,
    })
    .min(YEARS_OF_INVESTMENT_MIN, {
      message: `${YEARS_OF_INVESTMENT_LABEL} debe ser mayor que ${YEARS_OF_INVESTMENT_MIN - 1}`,
    })
    .max(YEARS_OF_INVESTMENT_MAX, {
      message: `${YEARS_OF_INVESTMENT_LABEL} debe ser menor o igual que ${YEARS_OF_INVESTMENT_MAX}`,
    }),
  initialInvestment: z
    .number({
      required_error: `${INITIAL_INVESTMENT_LABEL} es obligatorio`,
      invalid_type_error: `${INITIAL_INVESTMENT_LABEL} debe ser un número`,
    })
    .min(INITIAL_INVESTMENT_MIN, {
      message: `${INITIAL_INVESTMENT_LABEL} debe ser mayor que ${INITIAL_INVESTMENT_MIN - 1}`,
    }),
  annualInjection: z
    .number({
      required_error: `${ANNUAL_INJECTION_LABEL} es obligatorio`,
      invalid_type_error: `${ANNUAL_INJECTION_LABEL} debe ser un número`,
    })
    .min(ANNUAL_INJECTION_MIN, {
      message: `${ANNUAL_INJECTION_LABEL} debe ser mayor que ${ANNUAL_INJECTION_MIN - 1}`,
    }),
  symbol: z
    .string({
      required_error: `${SYMBOL_LABEL} es obligatorio`,
      invalid_type_error: `${SYMBOL_LABEL} es obligatorio`,
    })
    .min(SYMBOL_MIN_LENGTH, {
      message: `${SYMBOL_LABEL} debe ser mayor que ${SYMBOL_MIN_LENGTH} caracteres`,
    }),
});

export type TimeMachineScheme = z.infer<typeof scheme>;
