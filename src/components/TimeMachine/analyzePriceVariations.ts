import type { TimeMachineData } from './TimeMachineData';

export function analyzePriceVariations(
  priceHistory: number[],
  initialInvestmentAmount: number,
  annualInvestmentInjection: number,
): TimeMachineData[] {
  const datos: TimeMachineData[] = [
    {
      key: 0,
      year: new Date().getFullYear(),
      price: priceHistory[0],
      varPercent: 0,
      invested: initialInvestmentAmount,
      saved: initialInvestmentAmount,
      total: initialInvestmentAmount,
    },
  ];
  let capitalInvestmentBalance = initialInvestmentAmount;
  let capitalAhorrado = initialInvestmentAmount;
  let totalCapitalAccumulated = initialInvestmentAmount;
  const currentYear = new Date().getFullYear();

  for (let i = 1; i < priceHistory.length; i++) {
    const year = currentYear - (priceHistory.length - i - 1);
    const priceVariationPercentage = (priceHistory[i] - priceHistory[i - 1]) / priceHistory[i - 1];

    capitalInvestmentBalance = capitalInvestmentBalance * (1 + priceVariationPercentage);
    capitalAhorrado += annualInvestmentInjection;
    totalCapitalAccumulated = (totalCapitalAccumulated + annualInvestmentInjection) * (1 + priceVariationPercentage);

    datos.push({
      key: i,
      year,
      price: priceHistory[i],
      varPercent: Number.parseFloat((priceVariationPercentage * 100).toFixed(2)),
      invested: Number.parseFloat(capitalInvestmentBalance.toFixed(2)),
      saved: Number.parseFloat(capitalAhorrado.toFixed(2)),
      total: Number.parseFloat(totalCapitalAccumulated.toFixed(2)),
    });
  }

  return datos;
}
