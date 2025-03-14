import { SidebarLayout } from '@/components/sidebar/SidebarLayout';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import { Geist_Mono, Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import './setup.ts';

const fontHeadings = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
});

const fontBody = Roboto({
  weight: '400',
  variable: '--font-body',
  subsets: ['latin'],
});

const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${fontHeadings.variable} ${fontMono.variable} ${fontBody.variable} antialiased`}>
        <Providers>
          <SidebarLayout>
            <div className='pb-16'>{children}</div>
          </SidebarLayout>
        </Providers>
      </body>
    </html>
  );
}
