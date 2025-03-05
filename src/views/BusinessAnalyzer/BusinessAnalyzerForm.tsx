'use client';
import { FormField } from '@/components/ui/form';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import { isDev } from '@/utils/node-env';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type BusinessAnalyzerScheme, scheme } from './BusinessAnalyzerScheme';
import { MARKET_LABEL, SYMBOL_LABEL } from './constants';

export const DEBUG_VALUES = {
  market: 'NASDAQ',
  symbol: 'AAPL',
} as const;

interface BusinessAnalyzerFormProps {
  logger?: Logger;
  onSubmit: (values: BusinessAnalyzerScheme) => void;
}

const BusinessAnalyzerForm: React.FC<BusinessAnalyzerFormProps> = ({ logger, onSubmit: onSubmitHandler }) => {
  const form = useForm<BusinessAnalyzerScheme>({
    resolver: zodResolver(scheme),
    defaultValues: {
      market: isDev ? DEBUG_VALUES.market : '',
      symbol: isDev ? DEBUG_VALUES.symbol : '',
    },
  });

  function onSubmit(values: BusinessAnalyzerScheme) {
    logger?.debug('Submitting form with values:', values);
    onSubmitHandler(values);
  }

  return (
    <form {...form} className='flex flex-col sm:flex-row gap-4 sm:max-w-[30rem]' onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name='market'
        render={({ field, fieldState }) => (
          <Input
            label={MARKET_LABEL}
            labelPlacement='inside'
            type='text'
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            onChange={(event) => field.onChange(event.target.value)}
            placeholder='Ej: NASDAQ'
            value={field.value || ''}
          />
        )}
      />
      <FormField
        control={form.control}
        name='symbol'
        render={({ field, fieldState }) => (
          <Input
            label={SYMBOL_LABEL}
            labelPlacement='inside'
            type='text'
            {...field}
            errorMessage={fieldState.error?.message}
            isInvalid={!!fieldState.error}
            onChange={(event) => field.onChange(event.target.value)}
            placeholder='Ej: AAPL'
            value={field.value || ''}
          />
        )}
      />
      <Button className='mt-4' color='primary' type='submit' variant='shadow'>
        Buscar
      </Button>
    </form>
  );
};

export default BusinessAnalyzerForm;
