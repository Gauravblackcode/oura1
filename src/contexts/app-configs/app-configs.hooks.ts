import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/reducers';

const useConfigs = () => {
  const configs = useSelector((state: IRootState) => state.common.configs);
  return configs;
};

export default useConfigs;
