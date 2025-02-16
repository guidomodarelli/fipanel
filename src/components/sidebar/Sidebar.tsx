'use client';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from './AppSidebar';

const SIDEBAR_TRIGGER_HEIGHT_DEFAULT = '1.75rem';
const SIDEBAR_TRIGGER_PADDING_TOP = '0.5rem';
const SIDEBAR_TRIGGER_PADDING_BOTTOM = '1.25rem';
export const SIDEBAR_TRIGGER_HEIGHT = `${SIDEBAR_TRIGGER_HEIGHT_DEFAULT} - ${SIDEBAR_TRIGGER_PADDING_TOP} - ${SIDEBAR_TRIGGER_PADDING_BOTTOM}`;

interface SidebarProps extends React.PropsWithChildren {}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className='grow'>
        <div
          style={{ paddingTop: SIDEBAR_TRIGGER_PADDING_TOP, paddingBottom: SIDEBAR_TRIGGER_PADDING_BOTTOM }}
        >
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};
