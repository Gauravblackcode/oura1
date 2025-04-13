import { Tooltip, TooltipProps } from '@/lib/material-ui';
import styles from './rmn-tooltip.module.scss';

const Oura1Tooltip: React.FC<TooltipProps> = props => {
  return (
    <Tooltip
      classes={{
        tooltip: styles.tooltip,
        arrow: styles.arrow,
      }}
      {...props}
    />
  );
};

export default Oura1Tooltip;
