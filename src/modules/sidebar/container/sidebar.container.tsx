import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { carterColors, Tooltip, Typography } from 'shyftlabs-dsl';
import { Popover } from '@/lib/material-ui';
import { ChevronLeftIcon } from '@/lib/icons';
import ROUTES from '@/common/routes';
import { useSidebarMenuList } from '../helper/sidebar.helper';
import SidebarItem, { SidebarItemType } from '../components/sidebar-item.component';
import styles from '../styles/sidebar.module.scss';

const SidebarComponent: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [popperItem, setPopperItem] = useState<SidebarItemType & { index: number }>();
  const router = useRouter();
  const { MenuItems } = useSidebarMenuList();
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    MenuItems.forEach((item: any) => {
      if (item.subCategories && item.subCategories.some((subItem: any) => isActive(subItem.link))) {
        setExpandedItems(prev => new Set(prev).add(item.id));
      }
    });
  }, [router.pathname]);

  const isActive = (link: string) => router.pathname === link;

  const isInsightActive = (id: number) => router.asPath === `${ROUTES.INSIGHTS}/${id}`;

  const handleItemClick = (item: SidebarItemType, index: number = 0) => {
    if (isSidebarCollapsed && Number(item.subCategories?.length) > 0 && !popperItem) {
      setPopperItem({ ...item, index });
      return;
    }
    if (item.link === ROUTES.INSIGHTS && item.subCategories && item.subCategories.length > 0) {
      router.push(`${ROUTES.INSIGHTS}/${item.subCategories[0].id}`);
    } else {
      router.push(item.link);
    }
  };

  const toggleSubItems = (id: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getActiveSubItemIndex = (subCategories: any[] | undefined): number => {
    if (!subCategories) return -1;
    return subCategories.findIndex(subItem => isActive(subItem.link));
  };

  const handleInsightSubItemClick = (id: number) => {
    const path = `${ROUTES.INSIGHTS}/${id}`;
    router.push(path);
  };

  const handlePopperClose = () => {
    setPopperItem(undefined);
  };

  return (
    <div className={styles.container} data-collapsed={isSidebarCollapsed}>
      {MenuItems.filter(item => item.show).map((item, index) => {
        const activeSubItemIndex = getActiveSubItemIndex(item.subCategories);
        const isItemExpanded = expandedItems.has(item.id);
        return (
          <div
            key={item.id}
            className={styles.sidebar_item}
            ref={refItem => {
              itemRefs.current[index] = refItem;
            }}
          >
            <Tooltip
              title={isSidebarCollapsed ? item.label : undefined}
              PopperProps={{
                popperOptions: {
                  placement: 'right',
                },
              }}
            >
              <div>
                <SidebarItem
                  item={item}
                  sidebarCollapsed={isSidebarCollapsed}
                  showSubItems={isItemExpanded}
                  isActive={isActive(item.link) || activeSubItemIndex !== -1}
                  onToggleSubItems={() => toggleSubItems(item.id)}
                  onItemClick={() => handleItemClick(item, index)}
                />
              </div>
            </Tooltip>
            {!isSidebarCollapsed &&
              isItemExpanded &&
              item?.subCategories
                ?.filter(subItem => subItem.show)
                .map((subItem, index) => {
                  const isInsights = item.link === ROUTES.INSIGHTS;
                  return (
                    <SidebarItem
                      key={subItem.id}
                      item={subItem}
                      isActive={isInsights ? isInsightActive(subItem.id) : isActive(subItem.link)}
                      isSubItem={true}
                      sidebarCollapsed={isSidebarCollapsed}
                      onItemClick={() =>
                        isInsights ? handleInsightSubItemClick(subItem.id) : handleItemClick(subItem)
                      }
                      activeSubItemIndex={activeSubItemIndex}
                      index={index}
                    />
                  );
                })}
          </div>
        );
      })}

      <Popover
        open={!!popperItem?.id}
        anchorEl={itemRefs.current[popperItem?.index as number]}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handlePopperClose}
      >
        <div className={styles.popper_menu_container}>
          {popperItem?.subCategories
            ?.filter(subItem => subItem.show)
            ?.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  handleItemClick(item);
                  handlePopperClose();
                }}
              >
                <Typography>{item.label}</Typography>
              </button>
            ))}
        </div>
      </Popover>

      <button className={styles.toggle_icon} onClick={() => setIsSidebarCollapsed(prev => !prev)}>
        <ChevronLeftIcon height={24} width={24} color={carterColors.white} />
      </button>
    </div>
  );
};

export default SidebarComponent;
