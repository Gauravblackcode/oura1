import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bell, CircleCheckBig, Menu } from 'lucide-react';
import router from 'next/router';
import { Badge, CarterInput, Tooltip } from 'shyftlabs-dsl';
import { useSelector } from 'react-redux';
import { Drawer, Popover } from '@/lib/material-ui';
import Notifications from '@/modules/notifications/container/notifications.container';
import useUser from '@/contexts/user-data/user-data.hook';
import MagnifyingGlass from '@/assets/images/magnifying_glass.svg';
import { clearLocalStorage } from '@/common/helpers';
import ROUTES from '@/common/routes';
import UserProfile from '@/components/user-profile/user-profile.component';
import { toggleNotificationDrawer, toggleSidebar } from '@/redux/actions';
import { IRootState } from '@/redux/reducers';
import SearchComponent from '@/components/search-tab-component/search.component';
import useNotificationCount from '@/contexts/notification/notification.hook';
import useApprovalRequestCount from '@/contexts/approval-request/approval-request.hook';
import styles from '../topbar/topbar.module.scss';

enum TopBarVariant {
  FULL,
  MEDIUM,
  COMPACT,
}

interface TopBarProps {
  logoSrc: string;
  userName?: string;
  userAvatar?: string;
}

const TopBar: React.FC<TopBarProps> = ({ logoSrc }) => {
  const [variant, setVariant] = useState<TopBarVariant>(TopBarVariant.FULL);
  const globalSearchAE = useRef<HTMLElement | null>(null);
  const [isGlobalSearchVisible, setIsGlobalSearchVisible] = useState<boolean>(false);
  const { user, isPublisher, isAdvertiser, permission } = useUser();
  const hasApprovalRequestAccess = permission?.APPROVAL_REQUESTS.fullAccess || permission?.APPROVAL_REQUESTS.viewAccess;
  const hasSearchPermission =
    !permission?.AD_INVENTORY_PLACEMENTS.noAccess ||
    (isPublisher && !permission?.ALL_PUBLISHER_CAMPAIGNS.noAccess) ||
    (isAdvertiser && !permission?.ALL_ADVERTISER_CAMPAIGNS.noAccess);

  const isNotificationDrawerVisible = useSelector((state: IRootState) => state.common.notificationDrawer);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVariant(TopBarVariant.FULL);
      } else if (window.innerWidth >= 768) {
        setVariant(TopBarVariant.MEDIUM);
      } else {
        setVariant(TopBarVariant.COMPACT);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNotificationDrawer = () => {
    toggleNotificationDrawer(true);
  };

  const hideNotificationDrawer = () => {
    toggleNotificationDrawer(false);
  };
  const { notificationCount } = useNotificationCount();
  const { requestCount } = useApprovalRequestCount();

  const renderNotificationButton = () => (
    <Tooltip title="Notifications">
      <div className={styles.notificationWrapper}>
        <button className={styles.notificationButton} onClick={showNotificationDrawer}>
          <Bell size={16} />
        </button>
        {notificationCount > 0 && (
          <div className={styles.notificationBadge}>
            <Badge variant="secondary" label={notificationCount.toString()} />
          </div>
        )}
      </div>
    </Tooltip>
  );

  const logout = () => {
    clearLocalStorage();
    router.replace(ROUTES.AUTH.LOGOUT);
  };
  return (
    <div className={styles.topbar}>
      <div className={styles.inner}>
        <div className={`${styles.logo} ${variant === TopBarVariant.COMPACT ? styles.logoCompact : ''}`}>
          <img src={logoSrc} alt="Logo" width={73} height={24} />
        </div>

        {variant === TopBarVariant.COMPACT && (
          <button className={styles.iconButton} onClick={() => toggleSidebar(true)}>
            <Menu size={24} />
          </button>
        )}

        <Tooltip
          title={
            !hasSearchPermission
              ? "Search is disabled. You don't have the required permission to use this feature"
              : undefined
          }
        >
          <div className={styles.search}>
            <CarterInput
              placeholder="Search"
              type="text"
              width="100%"
              disabled={!hasSearchPermission}
              height={28}
              value=""
              iconProps={{
                end: [
                  {
                    icon: <Image src={MagnifyingGlass} width={12} height={12} alt="search" />,
                  },
                ],
              }}
              onClick={({ currentTarget }) => {
                globalSearchAE.current = currentTarget;
                setIsGlobalSearchVisible(true);
              }}
            />
          </div>
        </Tooltip>

        {variant === TopBarVariant.FULL && user && (
          <div className={styles.right}>
            {variant === TopBarVariant.FULL && isPublisher && hasApprovalRequestAccess && (
              <Tooltip title="Approval Requests">
                <div className={styles.notificationWrapper}>
                  <button
                    className={styles.notificationButton}
                    onClick={() => router.push(ROUTES.APPROVAL_REQUEST.BASE)}
                  >
                    <CircleCheckBig size={16} />
                  </button>
                  {requestCount > 0 && (
                    <div className={styles.approvalReqBadge}>
                      <Badge variant="secondary" label={requestCount.toString()} />
                    </div>
                  )}
                </div>
              </Tooltip>
            )}
            {renderNotificationButton()}
            <UserProfile
              user={{
                name: user?.name ? user.name : undefined,
                email: user?.email ? user.email : undefined,
              }}
              isLoading={false}
              logout={logout}
            />
          </div>
        )}

        {variant === TopBarVariant.MEDIUM && <div className={styles.right}>{renderNotificationButton()}</div>}

        {variant === TopBarVariant.COMPACT && <div className={styles.right}>{renderNotificationButton()}</div>}
      </div>

      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={() => setIsGlobalSearchVisible(false)}
        open={!!globalSearchAE && isGlobalSearchVisible}
        anchorEl={globalSearchAE.current}
        sx={{ zIndex: 999, marginTop: -2 }}
        slotProps={{
          paper: {
            sx() {
              return {
                width: '60%',
              };
            },
          },
        }}
      >
        <SearchComponent closePopup={() => setIsGlobalSearchVisible(false)} />
      </Popover>

      <Drawer anchor="right" onClose={hideNotificationDrawer} open={isNotificationDrawerVisible}>
        <Notifications />
      </Drawer>
    </div>
  );
};

export default TopBar;
