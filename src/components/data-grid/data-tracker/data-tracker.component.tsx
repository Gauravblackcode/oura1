import { Tooltip, Typography } from '@/lib/dsl/dsl';
import { AlertTriangleIcon } from '@/lib/icons';
import styles from './data-tracker.module.scss';

interface IDataTracker<T> {
  startValue: T;
  endValue: T;
  postText?: string;
  valueFormatter?: (value: T, type: 'start' | 'end') => string;
  tooltipProps?: Partial<{
    title: string;
    type: 'warning' | 'default';
    isVisible?: (item: { startValue: T; endValue: T; percentage: number }) => boolean;
  }>;
}

const DataTracker = <Type,>(props: IDataTracker<Type>) => {
  const { startValue, endValue, valueFormatter = item => item, postText = '', tooltipProps } = props;
  const percentage = (Math.max(Number(startValue), 0) / Number(endValue)) * 100;
  const isTooltipVisible = tooltipProps?.isVisible?.({ startValue, endValue, percentage }) || false;
  return (
    <div className={styles.container}>
      <div className={styles.progress_info}>
        <Typography>{`${valueFormatter(startValue, 'start')} / ${valueFormatter(endValue, 'end')} ${postText}`}</Typography>
        {isTooltipVisible && tooltipProps?.title && (
          <Tooltip title={tooltipProps.title} variant={'warning'}>
            <AlertTriangleIcon className={styles.alert_icon} />
          </Tooltip>
        )}
      </div>
      <div className={styles.progress_bar}>
        <div className={styles.progress} style={{ width: Number(endValue) === 0 ? '0%' : `${percentage}%` }} />
      </div>
    </div>
  );
};

export default DataTracker;
