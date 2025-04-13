import { carterColors, Tooltip, Typography } from 'shyftlabs-dsl';
import { InfoIcon } from '@/lib/icons';
import styles from './field-item.module.scss';

interface IFieldItem {
  label: string;
  tooltip?: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
}

const FieldItem: React.FC<IFieldItem> = props => {
  const { label, value, tooltip, className } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.label_wrapper}>
        <Typography variant="caption-medium" color={carterColors['text-600']}>
          {label}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip}>
            <InfoIcon size={16} color={carterColors['grey-400']} />
          </Tooltip>
        )}
      </div>
      {typeof value === 'string' ? (
        <Typography variant="body-semibold" color={carterColors['text-900']} trimLength={20}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </div>
  );
};

export default FieldItem;
