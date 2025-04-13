import { useMediaQuery } from '@/lib/material-ui';
import {
  HomeIcon,
} from '@/lib/icons';
import ROUTES from '@/common/routes';
import { SidebarItemType } from '../components/sidebar-item.component';

const useMobileMediaQuery = () => useMediaQuery(`(min-width: 320px) and (max-width: 767px)`);


export const useSidebarMenuList = () => {
  
  const isMobile = useMobileMediaQuery();
  

  const MenuItems: Array<SidebarItemType> = [
    {
      id: 1,
      label: 'Dashboard',
      icon: <HomeIcon width={16} height={16} />,
      link: ROUTES.DASHBOARD,
      show: true,
      testId: 'dashboard',
      assist: 'dashboard',
      mobileOnly: true,
    },
    
  ];

  return {
  
    MenuItems: isMobile ? MenuItems.filter(item => item.mobileOnly) : MenuItems,
  };
};
