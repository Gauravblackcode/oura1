import { PropsWithChildren, useState } from 'react';
import type { NextPage } from 'next';
import Navigation from '@/components/navigation/Navigation';
import styles from './main-layout.module.scss';

const MainLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.container}>
      {/* Mobile menu button */}
      <div className={styles.mobileMenuButton} onClick={toggleSidebar}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Navigation with responsive class */}
      <div className={`${styles.navigation} ${showSidebar ? styles.showNavigation : ''}`}>
        <Navigation />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;
