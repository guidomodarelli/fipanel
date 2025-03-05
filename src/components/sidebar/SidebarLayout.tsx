'use client';
import { symbols } from '../embeddings/TradingView/Symbols';
import { TradingViewTickerTape } from '../embeddings/TradingView/TradingViewTickerTape';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { Sidebar } from './Sidebar';

const SIDEBAR_TRIGGER_HEIGHT_DEFAULT = '1.75rem';
const SIDEBAR_TRIGGER_PADDING_TOP = '0.5rem';
const SIDEBAR_TRIGGER_PADDING_BOTTOM = '1.25rem';
export const SIDEBAR_TRIGGER_HEIGHT = `${SIDEBAR_TRIGGER_HEIGHT_DEFAULT} - ${SIDEBAR_TRIGGER_PADDING_TOP} - ${SIDEBAR_TRIGGER_PADDING_BOTTOM}`;

interface SidebarProps extends React.PropsWithChildren {}

export const SidebarLayout = ({ children }: SidebarProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar />
      {/* https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter */}
      <div className='flex flex-col min-h-screen grow [scrollbar-gutter:stable;]'>
        <TradingViewTickerTape symbols={symbols} />
        <main className='mx-8 grow'>
          <div
            style={{
              paddingTop: SIDEBAR_TRIGGER_PADDING_TOP,
              paddingBottom: SIDEBAR_TRIGGER_PADDING_BOTTOM,
            }}
          >
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
