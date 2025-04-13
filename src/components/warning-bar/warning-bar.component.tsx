import { Typography } from 'shyftlabs-dsl';
import { CloseIcon } from '@/lib/icons';
import styles from './warning-bar.module.scss';

interface IWarningBar {
  label?: React.ReactNode;
  containerClass?: string;
  onCloseClick?: () => void;
  ActionIcon?: React.ElementType;
}

const WarningBar: React.FC<IWarningBar> = props => {
  const { label, containerClass = '', ActionIcon = CloseIcon, onCloseClick } = props;
  return (
    <div className={`${styles.container} ${containerClass}`}>
      <Typography>{label}</Typography>
      {onCloseClick && <ActionIcon size={16} onClick={onCloseClick} />}
    </div>
  );
};

export default WarningBar;
