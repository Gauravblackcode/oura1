import { HTMLAttributes } from 'react';
import { CloseIcon } from '@/lib/icons';
import { TTableHeaderProps } from '../types';
import styles from './table-header.module.scss';

interface ITableHeader extends TTableHeaderProps, HTMLAttributes<HTMLDivElement> {
  ActionComponent?: (props: TTableHeaderProps) => React.ReactElement | null;
}

const TableHeader: React.FC<ITableHeader> = (props: ITableHeader) => {
  const { checkedItems, updateCheckedItems, ActionComponent, ...rest } = props;
  if (!checkedItems.length) {
    return null;
  }
  return (
    <div {...rest} className={`${styles.container} ${rest.className || ''}`}>
      <CloseIcon className={styles.table_close_icon} onClick={() => updateCheckedItems([])} size={18} />
      <span className={styles.title}>{`${checkedItems.length} entries selected:`}</span>
      {ActionComponent ? ActionComponent({ checkedItems, updateCheckedItems }) : null}
    </div>
  );
};

TableHeader.defaultProps = {
  ActionComponent: () => null,
};

export default TableHeader;
