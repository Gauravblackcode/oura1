import { SwitchProps } from '@/lib/material-ui';
import Oura1Switch from '../rmn-switch/rmn-switch.component';
import styles from './labeled-switch.module.scss';

interface ILabeledSwitch {
  label: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  switchProps?: Omit<SwitchProps, 'checked' | 'onChange' | 'disabled'>;
}

const LabeledSwitch: React.FC<ILabeledSwitch> = props => {
  const { label, switchProps, checked, onChange, disabled } = props;
  return (
    <div className={styles.container}>
      <span>{label}</span>
      <div className={styles.switch_container}>
        <Oura1Switch {...switchProps} checked={checked} onChange={onChange} disabled={disabled} />
      </div>
    </div>
  );
};

export default LabeledSwitch;
