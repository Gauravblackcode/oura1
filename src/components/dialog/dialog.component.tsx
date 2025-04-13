import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image';
import useDialog from '@/contexts/dialog/dialog.hook';
import { Stack } from '@/lib/material-ui';
import { Oura1Input } from '../input';

const DialogComponent: React.FC = () => {
  const [textInput, setTextInput] = React.useState<string | undefined>(undefined);
  const {
    testId,
    title,
    message,
    text,
    confirmHandler,
    rejectHandler,
    confirmBtnProps,
    rejectBtnProps,
    headerIconProps,
    actionContainerClass,
    titleProps,
    open,
    handleClose,
    blockCloseOnBackdropClick,
  } = useDialog();

  return (
    <Dialog
      data-testid={testId}
      open={open}
      onClose={(_evt, reason) => handleClose(_evt, reason, { blockCloseOnBackdropClick })}
      sx={{ zIndex: 9999 }}
    >
      {headerIconProps?.src && (
        <DialogContent className={headerIconProps.className}>
          <Image src={headerIconProps.src} alt={headerIconProps.alt || ''} />
        </DialogContent>
      )}
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1} className={titleProps?.className}>
          {titleProps?.icon}
          <span> {title} </span>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      {text && (
        <DialogContent>
          <div className={styles.input_container}>
            <Oura1Input fullWidth multiline onChange={({ target }) => setTextInput(target.value)} />
          </div>
        </DialogContent>
      )}
      <DialogActions className={actionContainerClass || ''}>
        <Button
          className={rejectBtnProps?.className}
          variant={(rejectBtnProps?.variant as any) || 'contained'}
          color={rejectBtnProps?.color as any}
          sx={{ textTransform: 'capitalize' }}
          onClick={() => {
            handleClose();
            rejectHandler();
          }}
        >
          {rejectBtnProps?.text || 'Disagree'}
        </Button>
        <Button
          className={confirmBtnProps?.className}
          variant={(confirmBtnProps?.variant as any) || 'contained'}
          color={confirmBtnProps?.color as any}
          sx={{ textTransform: 'capitalize' }}
          onClick={() => {
            handleClose();
            confirmHandler(textInput);
          }}
          autoFocus
        >
          {confirmBtnProps?.text || 'Agree'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
