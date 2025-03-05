import H1 from '@/lib/@fipanel/components/H1';
import P from '@/lib/@fipanel/components/P';
import type React from 'react';

interface LayoutProps extends React.PropsWithChildren {
  title: string;
  description: string;
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <H1>{title}</H1>
      <P>{description}</P>
      <main className='mt-8'>{children}</main>
    </>
  );
};
