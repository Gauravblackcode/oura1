import React, { PropsWithChildren } from 'react';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { Drawer, ThemeProvider, createTheme } from '@mui/material';
import Head from 'next/head';
import { IRootState } from '@/redux/reducers';
import { toggleSidebar } from '@/redux/actions';
import AuthPrerequisiteBoundary from '@/components/auth-prerequisite-boundary/auth-prerequisite-boundary.component';
import TutorialBoundary from '@/components/tutorial-boundary/tutorial-boundary.component';
import theme, { colors } from '@/lib/material-ui/theme';
import useAccount from '@/contexts/account/account-data.hook';
import UserDataProvider from '@/contexts/user-data/user-data.provider';
import AccountDataProvider from '@/contexts/account/account-data.provider';
import SidebarComponent from '@/modules/sidebar/container/sidebar.container';
import useConfigs from '@/contexts/app-configs/app-configs.hooks';
import NotificationCountProvider from '@/contexts/notification/notification.provider';
import ApprovalRequestCountProvider from '@/contexts/approval-request/approval-request.provider';
import styles from './internal-layout.module.scss';
import TopBar from './topbar/topbar.component';

interface Props {
  noInset?: boolean;
  noPadding?: boolean;
  noPaper?: boolean;
  head?: {
    title?: string;
    description?: string;
  };
}

const InternalLayout: NextPage<PropsWithChildren<Props>> = props => {
  const { children, head } = props;

  const { sidebar } = useSelector((state: IRootState) => state.common);

  const { account } = useAccount();
  const { client } = useConfigs();

  const theme1 = createTheme(theme, {
    palette: {
      primary: {
        main: account?.primaryColor ?? colors.primaryDefault,
      },
    },
  });

  return (
    <>
      <Head>
        <title>{head?.title || 'RMN Dashboard'}</title>
        <meta name="description" content={head?.description || 'RMN Dashboard'} />
      </Head>
      <UserDataProvider>
        <TutorialBoundary>
          <AuthPrerequisiteBoundary>
            <AccountDataProvider>
              <NotificationCountProvider>
                <ApprovalRequestCountProvider>
                  <ThemeProvider theme={theme1}>
                    <TopBar logoSrc={client?.invertLogo || ''} />
                    <div className={styles.container}>
                      <div className={styles.sidebar}>
                        <SidebarComponent />
                      </div>
                      <Drawer open={sidebar} onClose={() => toggleSidebar(false)}>
                        <SidebarComponent />
                      </Drawer>
                      <div className={styles.content}>{children}</div>
                    </div>
                  </ThemeProvider>
                </ApprovalRequestCountProvider>
              </NotificationCountProvider>
            </AccountDataProvider>
          </AuthPrerequisiteBoundary>
        </TutorialBoundary>
      </UserDataProvider>
    </>
  );
};

export default InternalLayout;
