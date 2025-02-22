import { TradingViewTickerTape } from '@/components/embeddings/TradingView/TradingViewTickerTape';
import { Sidebar } from '@/components/sidebar/Sidebar';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './setup.ts';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <TradingViewTickerTape />
          <div className='px-8'>
            <Sidebar>{children}</Sidebar>
          </div>
        </Providers>
      </body>
    </html>
  );
}
