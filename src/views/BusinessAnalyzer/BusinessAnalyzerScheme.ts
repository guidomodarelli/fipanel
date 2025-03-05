import { z } from 'zod';
import { MARKET_LABEL, SYMBOL_LABEL } from './constants';

export const scheme = z.object({
  market: z
    .string({
      required_error: `El ${MARKET_LABEL.toLocaleLowerCase()} es obligatorio`,
      invalid_type_error: `El ${MARKET_LABEL.toLocaleLowerCase()} debe ser un texto`,
    })
    .regex(/^[A-Z0-9.-]+$/, {
      message: `El ${MARKET_LABEL.toLocaleLowerCase()} solo puede contener letras mayúsculas, números, puntos y guiones`,
    }),
  symbol: z
    .string({
      required_error: `El ${SYMBOL_LABEL.toLocaleLowerCase()} es obligatorio`,
      invalid_type_error: `El ${SYMBOL_LABEL.toLocaleLowerCase()} debe ser un texto`,
    })
    .regex(/^[A-Z0-9.-]+$/, {
      message: `El ${SYMBOL_LABEL.toLocaleLowerCase()} solo puede contener letras mayúsculas, números, puntos y guiones`,
    }),
});

export type BusinessAnalyzerScheme = z.infer<typeof scheme>;
