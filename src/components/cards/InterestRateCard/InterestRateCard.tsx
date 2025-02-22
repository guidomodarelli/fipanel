'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePrimaryFinancialMetrics } from '@/hooks/usePrimaryFinancialMetrics';

const InterestRateCard = () => {
  const { TASA_POLITICA_MONETARIA } = usePrimaryFinancialMetrics();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasas de Interés</CardTitle>
      </CardHeader>
      <CardContent className='text-left'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tasa de Interés</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Política Monetaria</TableCell>
              {TASA_POLITICA_MONETARIA !== undefined && (
                <TableCell>{TASA_POLITICA_MONETARIA.value}%</TableCell>
              )}
            </TableRow>
            {/* <TableRow>
          <TableCell>LECAPs</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bonos</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Plazo Fijo</TableCell>
        </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InterestRateCard;
