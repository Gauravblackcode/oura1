import { createContext } from 'react';

interface DialogContextType {
  openDialog: (title: string, content: React.ReactNode, actions?: React.ReactNode) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType>({
  openDialog: () => {},
  closeDialog: () => {},
});
