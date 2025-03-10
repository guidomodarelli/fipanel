'use client';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import useAutocomplete from '@/hooks/useAutocomplete';
import { isDev } from '@/utils/node-env';
import { Autocomplete, AutocompleteItem, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type BusinessAnalyzerScheme, scheme } from './BusinessAnalyzerScheme';
import { MARKETS, MARKET_LABEL, SYMBOL_LABEL } from './constants';

export const DEBUG_VALUES = {
  market: 'NASDAQ',
  symbol: 'AAPL',
} as const;

interface BusinessAnalyzerFormProps {
  logger?: Logger;
  onSubmit: (values: BusinessAnalyzerScheme) => void;
}

const BusinessAnalyzerForm: React.FC<BusinessAnalyzerFormProps> = ({ logger, onSubmit: onSubmitHandler }) => {
  const { matchesPrefix } = useAutocomplete();
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
    <Form {...form}>
      <form className='flex flex-col md:flex-row gap-4 md:max-w-[30rem]' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='market'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Autocomplete
                  allowsCustomValue
                  label={MARKET_LABEL}
                  labelPlacement='inside'
                  placeholder='Escribe aquí...'
                  type='text'
                  {...field}
                  defaultFilter={matchesPrefix}
                  defaultItems={MARKETS}
                  defaultSelectedKey={field.value}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  onInputChange={(value) => field.onChange(value.length !== 0 ? value.trim().toUpperCase() : undefined)}
                  value={field.value.trim().toUpperCase()}
                >
                  {(item) => <AutocompleteItem key={item.key}>{item.key}</AutocompleteItem>}
                </Autocomplete>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='symbol'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  label={SYMBOL_LABEL}
                  labelPlacement='inside'
                  type='text'
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  onChange={(event) => field.onChange(event.target.value.trim().toUpperCase())}
                  placeholder='Ej: AAPL'
                  value={field.value.trim().toUpperCase()}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='mt-4' color='primary' type='submit' variant='shadow'>
          Buscar
        </Button>
      </form>
    </Form>
  );
};

export default BusinessAnalyzerForm;
