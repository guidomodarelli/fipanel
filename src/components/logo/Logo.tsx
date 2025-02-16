import { CopyrightIcon } from 'lucide-react';

interface LogoProps {
  long?: boolean;
}

export const Logo = ({ long }: LogoProps) => {
  return (
    <>
      <CopyrightIcon /> {long ? 'Inversiones' : ''}
    </>
  );
};
