import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { NumberUtils } from '@/lib/number';
import { cn } from '@/lib/utils';
import type React from 'react';
import type { TimeMachineData } from './TimeMachineData';
import { INVESTED, I_S, PRICE, SAVED, VARIATION, YEAR } from './constants';
import type { Legend } from './types';

interface TimeMachineTableColumn {
  name: string;
  uid: 'year' | 'price' | 'variation' | 'saved' | 'invested' | 'i+s';
}

export const columns: TimeMachineTableColumn[] = [
  { name: YEAR.toLocaleUpperCase(), uid: 'year' },
  { name: PRICE.toLocaleUpperCase(), uid: 'price' },
  { name: VARIATION.toLocaleUpperCase(), uid: 'variation' },
  { name: INVESTED.toLocaleUpperCase(), uid: 'invested' },
  { name: SAVED.toLocaleUpperCase(), uid: 'saved' },
  { name: I_S.toLocaleUpperCase(), uid: 'i+s' },
];

interface TimeMachineTableProps {
  data: TimeMachineData[];
  legends: Legend[];
}

const resolveCssClassByRange = (value: number, ranges: [string, number, number][]) => {
  // First check for exact matches (where min === max)
  const exactMatch = ranges.find(([_, min, max]) => min === max && value === min);
  if (exactMatch) return exactMatch[0];

  // Then check for ranges
  const rangeMatch = ranges.find(([_, min, max]) => value >= min && value < max);
  return rangeMatch ? rangeMatch[0] : '';
};

const TimeMachineTable: React.FC<TimeMachineTableProps> = ({ data = [], legends = [] }) => {
  return (
    <Table aria-label='Máquina del tiempo' wrapperClassName='max-h-[25.3rem] overflow-y-auto'>
      <TableHeader className='sticky top-0 bg-background shadow-sm'>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              className='text-center text-nowrap'
              key={column.uid}
              style={{
                color: legends.find((legend) => column.name.toLowerCase() === legend.name.toLowerCase())?.color,
              }}
            >
              {column.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className='text-center' key={item.key}>
            <TableCell>{item.year}</TableCell>
            <TableCell>{NumberUtils.formatCurrency(item.price)}</TableCell>
            <TableCell
              className={cn(
                'text-gray-800',
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
            >{`${item.varPercent}%`}</TableCell>
            <TableCell>{NumberUtils.formatCurrency(item.invested)}</TableCell>
            <TableCell>{NumberUtils.formatCurrency(item.saved)}</TableCell>
            <TableCell>{NumberUtils.formatCurrency(item.total)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeMachineTable;
