import { PropsWithChildren } from 'react';
import { carterColors, Tooltip, Typography } from 'shyftlabs-dsl';
import { InfoIcon } from '@/lib/icons';
import styles from './field.module.scss';

type TField = {
  label: string;
  RightComponent?: React.ElementType;
  className?: string;
  errorMessage?: any;
  moreInfo?: string;
  required?: boolean;
  fullWidth?: boolean;
};

const Field: React.FC<PropsWithChildren<TField>> = props => {
  const {
    label,
    fullWidth = false,
    children,
    className = '',
    errorMessage = '',
    RightComponent,
    moreInfo = '',
    required = false,
  } = props;
  return (
    <div className={`${styles.container} ${className}`} data-fullWidth={fullWidth}>
      <div className={styles.header_container}>
        <div className={styles.title_container}>
          {required ? (
            <Typography color={carterColors['text-800']} lineHeight='20px' fontFamily='Roboto'>{label}&nbsp;&#x2a;</Typography>
          ) : (
            <Typography color={carterColors['text-800']} lineHeight='20px' fontFamily='Roboto'>{label}</Typography>
          )}
          {moreInfo ? (
            <Tooltip title={moreInfo} placement="top">
              <InfoIcon color={carterColors['text-800']} size={16} />
            </Tooltip>
          ) : null}
        </div>
        {RightComponent ? <RightComponent /> : null}
      </div>
      {children}
      {!!errorMessage && (
        <div className={styles.error_message}>
          <Typography color={carterColors['red-700']}>{errorMessage}</Typography>
        </div>
      )}
    </div>
  );
};

export default Field;
