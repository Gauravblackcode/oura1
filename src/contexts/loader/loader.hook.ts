import { useContext } from 'react';
import { LoaderContext } from './loader.provider';

function useLoader() {
  const { isLoading, showLoader } = useContext(LoaderContext);
  return { isLoading, showLoader };
}

export default useLoader;
