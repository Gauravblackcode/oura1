import React from 'react';
import { StatusType } from 'types';
import { AlertTriangleIcon } from '@/lib/icons';
import { Tooltip } from '@/lib/material-ui';
import styles from './status-chip.module.scss';

type TStatusChip = {
  label: string;
  variant?: string;
  tooltip?: string;
  isLive?: boolean;
  centerAlign?: boolean;
};

const StatusChip: React.FC<TStatusChip> = (props: TStatusChip) => {
  const { label, variant = '', centerAlign, tooltip = '', isLive = undefined } = props;
  const liveToolTip = isLive ? 'Online' : 'Offline';
  const showLiveIcon = label === StatusType.Active && isLive !== undefined;
  const toolTipLocal = tooltip || (showLiveIcon ? liveToolTip : '');
  return (
    <div className={styles.container} data-center={centerAlign}>
      <div className={styles[variant || label.toLowerCase()]}>
        <p data-testid="status_option">{label.toLowerCase().replaceAll('_', ' ')}</p>
      </div>
      {!!toolTipLocal && (
        <Tooltip
          title={
            <div className={styles.tooltip_wrapper} data-live={showLiveIcon}>
              <span>{toolTipLocal}</span>
            </div>
          }
          classes={{ tooltip: styles.customTooltip }}
        >
          {showLiveIcon ? (
            <div className={styles.activity_dot} data-live={isLive} />
          ) : (
            <AlertTriangleIcon className={styles.warning_triangle} />
          )}
        </Tooltip>
      )}
    </div>
  );
};

export default StatusChip;
