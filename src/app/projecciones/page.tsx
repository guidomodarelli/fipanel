'use client';
import InvestmentProjectionForm from '@/components/form/InvestmentProjection/InvestmentProjectionForm';
import InvestmentProjectionTable from '@/components/form/InvestmentProjection/InvestmentProjectionTable';
import { InvestmentProjection } from '@/components/form/InvestmentProjection/scheme';
import { useSymbolPriceMonthly } from '@/hooks/useSymbolPriceMonthly';

interface YearData {
  year: number;
  price: number;
  varPercent: number;
  capitalSoloInvertido: number;
  capitalAhorrado: number;
  capitalInvertidoAhorrado: number;
}

function calcularDatos(precios: number[], capitalInicial: number, inyeccionMensual: number): YearData[] {
  const datos: YearData[] = [];
  let capitalSoloInvertido = capitalInicial;
  let capitalAhorrado = capitalInicial;
  let capitalInvertidoAhorrado = capitalInicial;

  for (let i = 0; i < precios.length; i++) {
    const year = 2000 + i;
    const varPercent = i === 0 ? 0 : (precios[i] - precios[i - 1]) / precios[i - 1];

    capitalSoloInvertido = i === 0 ? capitalInicial : capitalSoloInvertido * (1 + varPercent);

    capitalAhorrado = i === 0 ? capitalInicial : capitalAhorrado + inyeccionMensual;

    capitalInvertidoAhorrado =
      i === 0 ? capitalInicial : (capitalInvertidoAhorrado + inyeccionMensual) * (1 + varPercent);

    datos.push({
      year,
      price: precios[i],
      varPercent: parseFloat((varPercent * 100).toFixed(2)),
      capitalSoloInvertido: parseFloat(capitalSoloInvertido.toFixed(2)),
      capitalAhorrado: parseFloat(capitalAhorrado.toFixed(2)),
      capitalInvertidoAhorrado: parseFloat(capitalInvertidoAhorrado.toFixed(2)),
    });
  }

  return datos;
}

const Projection = () => {
  const [symbol, setSymbol] = useState('');
  const { isLoading, getTheLastAnnualPrice } = useSymbolPriceMonthly({ symbol });

  const handleSubmit = (values: InvestmentProjection) => {
    if (values.symbol) {
      setSymbol(values.symbol);
    }
  };

  return (
    <div className='flex gap-8'>
      <InvestmentProjectionForm onSubmit={handleSubmit} />
      <InvestmentProjectionTable data={[]} />
    </div>
  );
};

export default Projection;
