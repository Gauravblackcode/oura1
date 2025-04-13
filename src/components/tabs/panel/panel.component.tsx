import { PropsWithChildren } from 'react';
import styles from './panel.module.scss';

type TabPanelProps = PropsWithChildren<{
  index: number;
  value: number;
  customStyle?: string;
  noPadding?: boolean;
}>;

const TabPanel = (props: TabPanelProps) => {
  const { children = null, noPadding = false, value, index, customStyle = '', ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <div data-nowrap={noPadding} className={`${styles.tabPanelContent} ${customStyle}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default TabPanel;
