import { formatCurrency } from '@/lib/number';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import type React from 'react';
import { useCallback } from 'react';
import type { InvestmentProjectionData } from './InvestmentProjectionData';

interface InvestmentProjectionTableColumn {
  name: string;
  uid: 'year' | 'price' | 'variation' | 'saved' | 'invested' | 'i+s';
}

export const columns: InvestmentProjectionTableColumn[] = [
  { name: 'AÑO', uid: 'year' },
  { name: 'PRECIO', uid: 'price' },
  { name: 'VARIACIÓN %', uid: 'variation' },
  { name: 'AHORRADO', uid: 'saved' },
  { name: 'INVERTIDO', uid: 'invested' },
  { name: 'AHORRADO + INVERTIDO', uid: 'i+s' },
];

interface InvestmentProjectionTableProps {
  data: InvestmentProjectionData[];
}

const InvestmentProjectionTable: React.FC<InvestmentProjectionTableProps> = ({ data = [] }) => {
  const renderCell = useCallback((data: InvestmentProjectionData, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof InvestmentProjectionData];

    switch (columnKey as InvestmentProjectionTableColumn['uid']) {
      case 'year':
        return data.year;
      case 'price':
        return '-';
      case 'variation':
        return '-';
      case 'saved':
        return formatCurrency(data.saved);
      case 'invested':
        return formatCurrency(data.invested);
      case 'i+s':
        return formatCurrency(data['I+S']);
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label='Investment Projections' className='max-h-[25rem] overflow-y-auto' isHeaderSticky removeWrapper>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.key}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default InvestmentProjectionTable;
