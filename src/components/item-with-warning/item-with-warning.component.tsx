import { ReactNode } from 'react';
import { Tooltip } from '@/lib/dsl/dsl';
import { AlertTriangleIcon } from '@/lib/icons';
import styles from './item-with-warning.module.scss';

interface IItemWithWarning {
  label: string | ReactNode;
  labelClassName?: string;
  warning?: string;
}

const ItemWithWarning: React.FC<IItemWithWarning> = props => {
  const { label, labelClassName, warning } = props;
  return (
    <div className={styles.container}>
      <span className={labelClassName}>{label}</span>
      {!!warning && (
        <Tooltip title={warning} variant="warning">
          <AlertTriangleIcon className={styles.warning_triangle} />
        </Tooltip>
      )}
    </div>
  );
};

export default ItemWithWarning;
