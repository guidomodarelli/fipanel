import { Layout } from '@/layouts/Layout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <Layout description='¡Explore los insights y análisis para su empresa!' title='Analizador Empresarial'>
      {children}
    </Layout>
  );
}
