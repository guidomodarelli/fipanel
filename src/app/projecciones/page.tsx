'use client';
import InvestmentProjectionForm from '@/components/form/investment-projection/InvestmentProjectionForm';
import InvestmentProjectionTable from '@/components/form/investment-projection/InvestmentProjectionTable';
import { useState } from 'react';

const Projection = () => {
  const [symbol, setSymbol] = useState('IBM');
  // const { isLoading, getTheLastAnnualPrice } = useSymbolPriceMonthly({ symbol });

  const handleSubmit = (values: any) => {
    if (values.symbol) {
      setSymbol(values.symbol);
    }
  };

  return (
    <div className='flex gap-8'>
      <InvestmentProjectionForm onSubmit={handleSubmit} />
      <InvestmentProjectionTable />
    </div>
  );
};

export default Projection;
