import React from 'react';
import styles from '../styles/dashboard-layout.module.scss';
import { ouraColors, Typography } from '@/lib/dsl/dsl';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className={styles.containerLayout}>
      {children}
    </div>
  );
}; 
