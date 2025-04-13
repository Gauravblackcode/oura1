import { Switch } from '@/lib/material-ui';
import styles from './dual-label-switch.module.scss';

interface IDualLabelSwitch {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange: () => void;
}

const DualLabelSwitch: React.FC<IDualLabelSwitch> = props => {
  const { labelLeft, labelRight, checked, onChange } = props;
  return (
    <div className={styles.container}>
      <span className={styles.label}>{labelLeft}</span>
      <Switch
        classes={{
          root: styles.switchRoot,
          switchBase: styles.switchBase,
          thumb: styles.thumb,
          track: styles.track,
          checked: styles.switchBaseChecked,
          disabled: styles.switchBaseDisabled,
        }}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.label}>{labelRight}</span>
    </div>
  );
};

export default DualLabelSwitch;
