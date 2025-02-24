import { cn } from '@/lib/utils';
import { ChartBarIncreasingIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '../logo/Logo';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';

interface AppSidebarBase {
  key: string;
  label: string;
  icon?: () => React.ReactNode;
}

interface AppSidebarItem extends AppSidebarBase {
  link: string;
}

interface AppSidebarGroup extends AppSidebarBase {
  children: (AppSidebarItem | AppSidebarGroup)[];
}

const isGroup = (item: AppSidebarBase): item is AppSidebarGroup => {
  return (item as AppSidebarGroup).children !== undefined;
};

const items: AppSidebarGroup[] = [
  {
    key: 'explore',
    label: 'Explorar',
    children: [
      {
        key: 'home',
        label: 'Inicio',
        link: '/',
        icon: () => <HomeIcon />,
      },
      // {
      //   key: 'capital-markets',
      //   label: 'Capitalización de Mercados',
      //   link: '/capital-markets',
      // },
      // {
      //   key: 'analysis',
      //   label: 'Analizador Empresarial',
      //   link: '/analysis',
      //   icon: () => <FileChartColumnIncreasingIcon />,
      // },
      {
        key: 'projection',
        label: 'Proyección de Inversiones',
        link: '/projecciones',
        icon: () => <ChartBarIncreasingIcon />,
      },
    ],
  },
  // {
  //   key: 'screeners',
  //   label: 'Screeners',
  //   children: [
  //     {
  //       key: 'screener-international',
  //       label: 'Screener Internacional',
  //       link: '/screener/international',
  //       icon: () => <FilterIcon />,
  //     },
  //     {
  //       key: 'screener-argentina',
  //       label: 'Screener Argentina',
  //       link: '/screener/argentina',
  //       icon: () => <FilterIcon />,
  //     },
  //   ],
  // },
];

export const Sidebar = () => {
  const { open: isOpenSidebar, setOpenMobile, isMobile } = useSidebar();
  const [showLongLogo, setShowLongLogo] = useState(true);
  const [isSidebarOpening, setIsSidebarOpening] = useState(false);
  const [isSidebarClosing, setIsSidebarClosing] = useState(false);

  useEffect(() => {
    let timeout = 0;
    if (isOpenSidebar) {
      setIsSidebarOpening(true);
      timeout = 150;
    } else {
      setIsSidebarClosing(true);
      timeout = 200;
    }
    const timeoutId = setTimeout(() => {
      setShowLongLogo(isOpenSidebar);
      setIsSidebarOpening(false);
      setIsSidebarClosing(false);
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, [isOpenSidebar]);

  const renderGroup = (group: AppSidebarGroup) => {
    return (
      <SidebarGroup key={group.key}>
        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>{renderItems(group.children)}</SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  const renderItem = (item: AppSidebarItem) => {
    return (
      <SidebarMenuItem key={item.key}>
        <SidebarMenuButton asChild>
          <Link href={item.link} onClick={() => isMobile && setOpenMobile(false)}>
            {item.icon?.()}
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const renderItems = (items: (AppSidebarItem | AppSidebarGroup)[]) => {
    return items.map((item) => (isGroup(item) ? renderGroup(item) : renderItem(item)));
  };

  return (
    <SidebarBase collapsible='icon'>
      <SidebarHeader>
        <SidebarContent
          className={cn(
            'flex flex-row',
            !isMobile && {
              'justify-center': !showLongLogo && !isSidebarOpening && !isSidebarClosing,
              'ml-1': isSidebarOpening,
            },
          )}
        >
          {isMobile || showLongLogo ? <Logo long /> : <Logo />}
        </SidebarContent>
      </SidebarHeader>
      {renderItems(items)}
    </SidebarBase>
  );
};
