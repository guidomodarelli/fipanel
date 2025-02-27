export const NumberUtils = {
  formatCurrency(value: number) {
    return Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value);
  },
  formatNumber(value: number) {
    return Intl.NumberFormat('es-AR', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(value);
  },
};
