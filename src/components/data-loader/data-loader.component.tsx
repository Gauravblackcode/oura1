import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/reducers';
import styles from './data-loader.module.scss';

const DataLoader = () => {
  const loader = useSelector((state: IRootState) => state.common.loader);
  if (loader) {
    return (
      <div className={styles.loader}>
        <div className={styles['loader__lds-ellipsis']}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
  return null;
};

export default DataLoader;
