import { Snackbar } from 'shyftlabs-dsl';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/reducers';
import { closeAlert } from '@/redux/actions';

const Oura1Alert = () => {
  const { alert } = useSelector((state: IRootState) => state.common);

  return (
    <Snackbar
      {...(alert ?? {})}
      onClose={() => {
        closeAlert();
      }}
    />
  );
};

export default Oura1Alert;
