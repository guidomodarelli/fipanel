import { DolarSignIcon } from '@/components/icons/DolarSignIcon';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import useAutocomplete from '@/hooks/useAutocomplete';
import { NumberUtils } from '@/lib/number';
import { isDev } from '@/utils/node-env';
import { Autocomplete, AutocompleteItem, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type TimeMachineScheme, scheme } from './TimeMachineScheme';
import { ANNUAL_INJECTION_LABEL, INITIAL_INVESTMENT_LABEL, YEARS_OF_INVESTMENT_LABEL } from './constants';
import { symbols } from './symbols';

const DEBUG_VALUES = {
  yearsOfInvestment: 10,
  initialInvestment: 2_000,
  annualInjection: 1200,
  symbol: 'IBM',
} as const;

interface TimeMachineFormProps {
  logger?: Logger;
  onSubmit: (values: TimeMachineScheme) => void;
}

const TimeMachineForm: React.FC<TimeMachineFormProps> = ({ logger, onSubmit: onSubmitHandler }) => {
  const { matchesPrefix } = useAutocomplete();
  const form = useForm<TimeMachineScheme>({
    resolver: zodResolver(scheme),
    defaultValues: {
      yearsOfInvestment: isDev ? DEBUG_VALUES.yearsOfInvestment : ('' as unknown as number),
      initialInvestment: isDev ? DEBUG_VALUES.initialInvestment : ('' as unknown as number),
      annualInjection: isDev ? DEBUG_VALUES.annualInjection : ('' as unknown as number),
      symbol: isDev ? DEBUG_VALUES.symbol : '',
    },
  });

  function onSubmit(values: TimeMachineScheme) {
    logger?.debug('Submitting form with values:', values);
    onSubmitHandler(values);
  }

  const changeNumberHandler = (value: string) => {
    // Format the number value to remove the commas
    const numberValue = Number(value.replace(/\./g, '').replace(/[^0-9,]/g, ''));
    if (Number.isNaN(numberValue)) {
      return undefined;
    }
    return numberValue;
  };

  return (
    <Form {...form}>
      <form className='space-y-8 shrink-0' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='yearsOfInvestment'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='sm:max-w-sm'
                  label={YEARS_OF_INVESTMENT_LABEL}
                  labelPlacement='inside'
                  type='text'
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  onChange={(event) => field.onChange(changeNumberHandler(event.target.value))}
                  value={field.value ? NumberUtils.formatNumber(field.value) : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='initialInvestment'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='sm:max-w-sm'
                  label={INITIAL_INVESTMENT_LABEL}
                  labelPlacement='inside'
                  startContent={<DolarSignIcon />}
                  type='text'
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  onChange={(event) => field.onChange(changeNumberHandler(event.target.value))}
                  value={field.value ? NumberUtils.formatNumber(field.value) : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='annualInjection'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='sm:max-w-sm'
                  label={ANNUAL_INJECTION_LABEL}
                  labelPlacement='inside'
                  startContent={<DolarSignIcon />}
                  type='text'
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  onChange={(event) => field.onChange(changeNumberHandler(event.target.value))}
                  value={field.value ? NumberUtils.formatNumber(field.value) : ''}
                />
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
                <Autocomplete
                  allowsCustomValue
                  className='sm:max-w-sm'
                  defaultFilter={matchesPrefix}
                  defaultItems={symbols}
                  defaultSelectedKey={field.value}
                  label='Escoge un símbolo'
                  {...field}
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  onInputChange={(value) => field.onChange(value.length !== 0 ? value : undefined)}
                  value={field.value as unknown as string}
                >
                  {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='mt-4' color='primary' type='submit' variant='shadow'>
          Calcular
        </Button>
      </form>
    </Form>
  );
};

export default TimeMachineForm;
