import { Typography } from '@/lib/dsl/dsl';
import styles from './no-data-placeholder.module.scss';

interface NoDataPlaceholderProps {
  message?: string;
}

const NoDataPlaceholder = ({ message = 'No data available' }: NoDataPlaceholderProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="body-regular">{message}</Typography>
    </div>
  );
};

export default NoDataPlaceholder;
