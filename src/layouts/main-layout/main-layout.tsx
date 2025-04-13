import { PropsWithChildren } from 'react';
import type { NextPage } from 'next';
import styles from './main-layout.module.scss';

const MainLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;
