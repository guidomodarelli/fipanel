'use client';
import { SkeletonText } from '@/components/skeletons/SkeletonText';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePrimaryFinancialMetrics } from '@/hooks/usePrincipalesVariables';
import { formatDate } from '@/lib/date';

const IPCCard = () => {
  const { IPC_INTERANUAL, IPC_MENSUAL, IPC_REM } = usePrimaryFinancialMetrics();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inflación (IPC)</CardTitle>
        <CardDescription className='flex gap-2'>
          Datos de la Inflación de la República Argentina. <br />
          Fuente: BCRA
        </CardDescription>
      </CardHeader>
      <CardContent className='text-left flex flex-col gap-2'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IPC</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                Mensual <sup>(1)</sup>
              </TableCell>
              <TableCell>
                {IPC_MENSUAL !== undefined ? <>{IPC_MENSUAL.value}%</> : <SkeletonText />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Interanual</TableCell>
              <TableCell>
                {IPC_INTERANUAL !== undefined ? <>{IPC_INTERANUAL.value}%</> : <SkeletonText />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                REM <sup>(2)</sup>
              </TableCell>
              <TableCell>{IPC_REM !== undefined ? <>{IPC_REM.value}%</> : <SkeletonText />}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className='text-xs font-normal text-muted-foreground' colSpan={3}>
                Última actualización: {IPC_REM ? formatDate(new Date(IPC_REM?.date)) : <SkeletonText />}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <p className='text-xs text-muted-foreground !mb-0'>
          <sup>(1)</sup> Del último mes
        </p>
        <p className='text-xs text-muted-foreground'>
          <sup>(2)</sup> Esperado en los próximos 12 meses
        </p>
      </CardContent>
    </Card>
  );
};

export default IPCCard;
