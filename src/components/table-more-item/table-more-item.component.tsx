import { Tooltip } from '@/lib/material-ui';
import { LabelToolTip } from '../tooltip';
import styles from './table-more-item.module.scss';

interface ITableMoreItem {
  title?: string;
  dataKey?: string;
  options: any[];
}

const TableMoreItem: React.FC<ITableMoreItem> = props => {
  const { title, dataKey = 'label', options } = props;
  const firstItem = title ?? options?.[0]?.[dataKey] ?? '--';
  return (
    <div className={styles.container}>
      <LabelToolTip label={firstItem} />
      {options?.length > 1 && (
        <Tooltip
          classes={{ tooltip: styles.custom_tooltip }}
          title={
            <div className={styles.tooltip_container} data-testid="extra-team-tooltip">
              {options.slice(1, options.length).map((option, index) => (
                <p key={index}>{option[dataKey]}</p>
              ))}
            </div>
          }
        >
          <div className={styles.more_icon} data-testid="extra-team">{`+ ${options.length - 1}`}</div>
        </Tooltip>
      )}
    </div>
  );
};

export default TableMoreItem;
