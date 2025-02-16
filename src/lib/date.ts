export const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'numeric', year: 'numeric' });
};
