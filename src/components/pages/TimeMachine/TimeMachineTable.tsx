import { NumberUtils } from '@/lib/number';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import type React from 'react';
import { useCallback } from 'react';
import type { TimeMachineData } from './TimeMachineData';
import { INVESTED, I_S, PRICE, SAVED, VARIATION, YEAR } from './constants';

interface TimeMachineTableColumn {
  name: string;
  uid: 'year' | 'price' | 'variation' | 'saved' | 'invested' | 'i+s';
}

export const columns: TimeMachineTableColumn[] = [
  { name: YEAR.toLocaleUpperCase(), uid: 'year' },
  { name: PRICE.toLocaleUpperCase(), uid: 'price' },
  { name: VARIATION.toLocaleUpperCase(), uid: 'variation' },
  { name: SAVED.toLocaleUpperCase(), uid: 'saved' },
  { name: INVESTED.toLocaleUpperCase(), uid: 'invested' },
  { name: I_S.toLocaleUpperCase(), uid: 'i+s' },
];

interface TimeMachineTableProps {
  data: TimeMachineData[];
}

const resolveCssClassByRange = (value: number, ranges: [string, number, number][]) => {
  // First check for exact matches (where min === max)
  const exactMatch = ranges.find(([_, min, max]) => min === max && value === min);
  if (exactMatch) return exactMatch[0];

  // Then check for ranges
  const rangeMatch = ranges.find(([_, min, max]) => value >= min && value < max);
  return rangeMatch ? rangeMatch[0] : '';
};

const TimeMachineTable: React.FC<TimeMachineTableProps> = ({ data = [] }) => {
  const renderCell = useCallback((data: TimeMachineData, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof TimeMachineData];

    switch (columnKey as TimeMachineTableColumn['uid']) {
      case 'year':
        return data.year;
      case 'price':
        return NumberUtils.formatCurrency(data.price);
      case 'variation':
        return `${data.varPercent}%`;
      case 'saved':
        return NumberUtils.formatCurrency(data.saved);
      case 'invested':
        return NumberUtils.formatCurrency(data.invested);
      case 'i+s':
        return NumberUtils.formatCurrency(data.total);
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label='Máquina del tiempo' className='max-h-[25.3rem] overflow-y-auto' isHeaderSticky removeWrapper>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className='text-center' key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell
                className={cn(
                  'text-center',
                  {
                    'text-gray-800 font-bold': columnKey === 'variation',
                  },
                  columnKey === 'variation' &&
                    resolveCssClassByRange(item.varPercent, [
                      ['bg-red-500 text-white', Number.NEGATIVE_INFINITY, -30],
                      ['bg-red-400 text-white', -30, -20],
                      ['bg-red-300', -20, -10],
                      ['bg-red-200', -10, -5],
                      ['bg-red-100', -5, 0],
                      ['bg-white', 0, 0],
                      ['bg-green-100', 0, 5],
                      ['bg-green-200', 5, 10],
                      ['bg-green-300', 10, 20],
                      ['bg-green-400', 20, 30],
                      ['bg-green-500', 30, Number.POSITIVE_INFINITY],
                    ]),
                )}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TimeMachineTable;
