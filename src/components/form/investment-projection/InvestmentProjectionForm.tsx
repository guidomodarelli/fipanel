import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Autocomplete, AutocompleteItem, Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { scheme } from './scheme';
import { symbols } from './symbols';
import { formatNumber } from '@/lib/number';
import { DolarSignIcon } from '@/components/icons/DolarSignIcon';

interface InvestmentProjectionFormProps {
  onSubmit: (values: z.infer<typeof scheme>) => void;
}

const InvestmentProjectionForm: React.FC<InvestmentProjectionFormProps> = ({ onSubmit: onSubmitHandler }) => {
  const form = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues: {
      yearsOfInvestment: '' as unknown as number,
      initialInvestment: '' as unknown as number,
      monthlyInjection: '' as unknown as number,
    },
  });

  const prefixFilter = (text: string, inputValue: string) => {
    if (inputValue.length === 0) {
      return true;
    }

    // Normalize both strings so we can slice safely
    // take into account the ignorePunctuation option as well...
    text = text.normalize('NFC').toLocaleLowerCase();
    inputValue = inputValue.normalize('NFC').toLocaleLowerCase();

    return text.slice(0, inputValue.length) === inputValue;
  };

  function onSubmit(values: z.infer<typeof scheme>) {
    onSubmitHandler(values);
  }

  const changeNumberHandler = (value: string) => {
    // Format the number value to remove the commas
    const numberValue = Number(value.replace(/\./g, '').replace(/[^0-9,]/g, ''));
    if (isNaN(numberValue)) {
      return undefined;
    }
    return numberValue;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 shrink-0 grow-0'>
        <FormField
          control={form.control}
          name='yearsOfInvestment'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='max-w-sm'
                  label='Años de inversión'
                  labelPlacement='inside'
                  type='text'
                  {...field}
                  onChange={(event) => field.onChange(changeNumberHandler(event.target.value))}
                  value={field.value ? formatNumber(field.value) : ''}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
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
                  className='max-w-sm'
                  label='Inversión inicial'
                  labelPlacement='inside'
                  type='text'
                  startContent={<DolarSignIcon />}
                  {...field}
                  onChange={(event) => field.onChange(changeNumberHandler(event.target.value))}
                  value={field.value ? formatNumber(field.value) : ''}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='monthlyInjection'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='max-w-sm'
                  label='Inyección Mensual'
                  labelPlacement='inside'
                  type='text'
                  startContent={<DolarSignIcon />}
                  {...field}
                  onChange={(event) => field.onChange(changeNumberHandler(event.target.value))}
                  value={field.value ? formatNumber(field.value) : ''}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
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
                  className='max-w-sm'
                  defaultFilter={prefixFilter}
                  defaultItems={symbols}
                  label='Escoge un símbolo'
                  {...field}
                  onInputChange={(value) => field.onChange(value.length !== 0 ? value : undefined)}
                  value={field.value as unknown as string}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                >
                  {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-4' color='primary' variant='shadow'>
          Calcular
        </Button>
      </form>
    </Form>
  );
};

export default InvestmentProjectionForm;
