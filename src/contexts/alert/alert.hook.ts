import { useContext } from 'react';
import { AlertContext } from './alert.provider';

function useAlert() {
  const { message, variant, showAlert, closeAlert } = useContext(AlertContext);
  return { message, variant, showAlert, closeAlert };
}

export default useAlert;
