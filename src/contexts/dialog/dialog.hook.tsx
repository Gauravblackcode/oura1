import { useContext } from 'react';
import { DialogContext } from './dialog.provider';

const useDialog = () => {
  return useContext(DialogContext);
};

export default useDialog;
