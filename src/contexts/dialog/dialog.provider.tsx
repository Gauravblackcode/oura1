import React, { useState, useCallback } from 'react';
import { DialogContext } from './dialog.context';
import Oura1Dialog from '@/components/dialogs/Oura1Dialog';

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    content: null,
    actions: null,
  });

  const openDialog = useCallback((title: string, content: React.ReactNode, actions?: React.ReactNode) => {
    setDialogState({
      isOpen: true,
      title,
      content,
      actions,
    });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Oura1Dialog
        open={dialogState.isOpen}
        onClose={closeDialog}
        title={dialogState.title}
        actions={dialogState.actions}
      >
        {dialogState.content}
      </Oura1Dialog>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
