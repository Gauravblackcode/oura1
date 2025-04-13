import { Switch, SwitchProps } from '@/lib/material-ui';
import styles from './rmn-switch.module.scss';

const Oura1Switch: React.FC<SwitchProps> = props => {
  return (
    <Switch
      classes={{
        root: styles.switchRoot,
        switchBase: styles.switchBase,
        thumb: styles.thumb,
        track: styles.track,
        checked: styles.switchBaseChecked,
        disabled: styles.switchBaseDisabled,
      }}
      {...props}
    />
  );
};

export default Oura1Switch;
