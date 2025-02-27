'use client';
import { SkeletonText } from '@/components/skeletons/SkeletonText';
import { useDolarsPrices } from '@/hooks/useDolarsPrices';
import { NumberUtils } from '@/lib/number';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

const DolarCard = () => {
  const { isLoading, oficial, mep, ccl, blue } = useDolarsPrices();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dolar</CardTitle>
      </CardHeader>
      <CardContent className='text-left'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Compra</TableHead>
              <TableHead>Venta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Oficial</TableCell>
              <TableCell>
                {oficial !== undefined ? NumberUtils.formatCurrency(oficial?.buy) : <SkeletonText />}
              </TableCell>
              <TableCell>
                {oficial !== undefined ? NumberUtils.formatCurrency(oficial?.sell) : <SkeletonText />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Blue</TableCell>
              <TableCell>{blue !== undefined ? NumberUtils.formatCurrency(blue?.buy) : <SkeletonText />}</TableCell>
              <TableCell>{blue !== undefined ? NumberUtils.formatCurrency(blue?.sell) : <SkeletonText />}</TableCell>
            </TableRow>
            {(isLoading || mep !== undefined) && (
              <TableRow>
                <TableCell>MEP</TableCell>
                <TableCell>{mep !== undefined ? NumberUtils.formatCurrency(mep?.buy) : <SkeletonText />}</TableCell>
                <TableCell>{mep !== undefined ? NumberUtils.formatCurrency(mep?.sell) : <SkeletonText />}</TableCell>
              </TableRow>
            )}
            {(isLoading || ccl !== undefined) && (
              <TableRow>
                <TableCell>CCL</TableCell>
                <TableCell>{ccl !== undefined ? NumberUtils.formatCurrency(ccl?.buy) : <SkeletonText />}</TableCell>
                <TableCell>{ccl !== undefined ? NumberUtils.formatCurrency(ccl?.sell) : <SkeletonText />}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DolarCard;
