import { CloseIcon } from '@/lib/icons';
import styles from './chip-list.module.scss';

interface IChipList<T> {
  list: T[];
  renderItem?: (item: T) => React.ReactElement | string;
  uniqueKey?: (item: T) => string;
  onDeleteClick?: (item: T) => void;
  fallback?: string;
  className?: string;
  labelClass?: string;
  verticalAlign?: boolean;
}

const ChipList = <Type,>(props: IChipList<Type>) => {
  const {
    className = '',
    labelClass = '',
    list,
    uniqueKey = item => item as string,
    renderItem = item => item as string,
    onDeleteClick,
    verticalAlign = false,
    fallback = '--',
  } = props;
  if (!list.length) {
    return <div className={styles.container}>{fallback}</div>;
  }
  return (
    <div className={`${styles.container} ${className}`} data-align={verticalAlign}>
      {list.map(item => (
        <div key={uniqueKey(item)} className={styles.chip}>
          <p className={`${styles.chip_label} ${labelClass}`}>{renderItem(item)}</p>
          {onDeleteClick && <CloseIcon size={16} onClick={() => onDeleteClick(item)} />}
        </div>
      ))}
    </div>
  );
};

export default ChipList;
