import React, { useState, useMemo, useCallback } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import DialogComponent from '@/components/dialog/dialog.component';

export interface DialogContextInterface {
  testId: string;
  title: string;
  titleProps?: Partial<{
    icon?: any;
    className?: any;
  }>;
  message: string;
  text: Boolean;
  confirmHandler: Function;
  rejectHandler: Function;
  showDialog: Function;
  confirmBtnProps?: {
    text?: string;
    color?: string | 'error' | 'success' | 'info' | 'inherit' | 'warning';
    className?: any;
    variant?: string | 'contained' | 'outlined' | 'text';
  };
  rejectBtnProps?: {
    text?: string;
    color?: string | 'error' | 'success' | 'info' | 'inherit' | 'warning';
    className?: any;
    variant?: string | 'contained' | 'outlined' | 'text';
  };
  headerIconProps?: {
    src?: string | StaticImport;
    alt?: string;
    className?: any;
    width?: number;
    height?: number;
  };
  actionContainerClass?: any;
  open: boolean;
  handleClose: Function;
  blockCloseOnBackdropClick?: boolean;
}

export const DialogContext = React.createContext<DialogContextInterface>({
  testId: '',
  title: '',
  message: '',
  text: false,
  confirmHandler: () => {},
  rejectHandler: () => {},
  showDialog: () => {},
  confirmBtnProps: {},
  rejectBtnProps: {},
  headerIconProps: {},
  actionContainerClass: '',
  open: false,
  handleClose: () => {},
  blockCloseOnBackdropClick: false,
});

const DialogProvider = ({ children }: any) => {
  const [dialog, setDialog] = useState({
    testId: '',
    title: '',
    titleProps: {},
    message: '',
    text: false,
    confirmHandler: () => {},
    rejectHandler: () => {},
    confirmBtnProps: {},
    rejectBtnProps: {},
    headerIconProps: {},
    actionContainerClass: '',
    open: false,
    handleClose: () => {},
    blockCloseOnBackdropClick: false,
  });

  const handleClose = (_evt?: any, reason?: string, options?: any) => {
    if (reason === 'backdropClick' && options?.blockCloseOnBackdropClick) {
      return;
    }
    setDialog(prevDialog => ({
      ...prevDialog,
      open: false, // Close dialog when handleClose is called
    }));
  };

  const showDialog = useCallback(
    ({
      testId,
      title,
      titleProps,
      message,
      text,
      confirmHandler,
      rejectHandler,
      confirmBtnProps,
      rejectBtnProps,
      headerIconProps,
      actionContainerClass,
      blockCloseOnBackdropClick,
    }: DialogContextInterface) => {
      const dialogState: any = {
        testId,
        title,
        titleProps,
        message,
        text,
        confirmHandler,
        rejectHandler,
        confirmBtnProps,
        rejectBtnProps,
        headerIconProps,
        actionContainerClass,
        open: true,
        handleClose,
        blockCloseOnBackdropClick,
      };
      setDialog(dialogState);
    },
    [],
  );

  const contextValue: DialogContextInterface = useMemo(
    () => ({
      testId: dialog.testId,
      title: dialog.title,
      titleProps: dialog.titleProps,
      message: dialog.message,
      text: dialog.text,
      confirmHandler: dialog.confirmHandler,
      rejectHandler: dialog.rejectHandler,
      confirmBtnProps: dialog.confirmBtnProps,
      rejectBtnProps: dialog.rejectBtnProps,
      headerIconProps: dialog.headerIconProps,
      open: dialog.open,
      handleClose: dialog.handleClose,
      showDialog,
      actionContainerClass: dialog.actionContainerClass,
      blockCloseOnBackdropClick: dialog.blockCloseOnBackdropClick,
    }),
    [dialog, showDialog],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <DialogComponent />
    </DialogContext.Provider>
  );
};

export default DialogProvider;
