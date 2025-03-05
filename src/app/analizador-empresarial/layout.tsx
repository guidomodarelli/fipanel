import H1 from '@/lib/@fipanel/components/H1';
import P from '@/lib/@fipanel/components/P';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <H1>Analizador Empresarial</H1>
      <P>¡Explore los insights y análisis para su empresa!</P>
      {children}
    </>
  );
}
