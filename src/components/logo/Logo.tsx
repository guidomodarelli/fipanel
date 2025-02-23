import { cn } from '@/lib/utils';
import { FunctionSquareIcon } from 'lucide-react';

interface LogoProps {
  long?: boolean;
}

export const Logo = ({ long }: LogoProps) => {
  return (
    <div className={cn('flex', { 'ml-1 gap-1': long })}>
      <FunctionSquareIcon /> {long ? 'Fipanel' : ''}
    </div>
  );
};
