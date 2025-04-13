import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, CarterTextArea, Typography } from '@/lib/dsl/dsl';
import { CloseIcon, CopyIcon } from '@/lib/icons';
import styles from './optional-comment.module.scss';

interface OptCommentProps {
  open: boolean;
  title: string;
  message: string;
  closeHandler: () => void;
  confirmHandler: (text?: string) => void;
}

const OptCommentComponent = (props: OptCommentProps) => {
  const [textInput, setTextInput] = React.useState<string>('');
  const { title, message, open, confirmHandler, closeHandler } = props;

  return (
    <Dialog data-testid="opt-comment" open={open} onClose={closeHandler} sx={{ zIndex: 9999 }}>
      <DialogTitle className={styles.title_container}>
        <div className={styles.left}>
          <div className={styles.copy_icon}>
            <CopyIcon />
          </div>
          <Typography>
            {title} <DialogContentText>{message}</DialogContentText>
          </Typography>
        </div>
        <CloseIcon className={styles.close_icon} onClick={closeHandler} />
      </DialogTitle>
      <DialogContent className={styles.message_container}>
        <CarterTextArea
          rows={6}
          cols={22}
          placeholder="Comment to Notify ......"
          onChange={({ target }) => setTextInput(target.value)}
        />
      </DialogContent>
      <DialogActions className={styles.action_container}>
        <Button
          data-testid="opt-comment-skip"
          label="Skip"
          onClick={() => confirmHandler()}
          variant="text-only"
          size="small"
          className={styles.skip_btn}
        />
        <Button
          data-testid="opt-comment-confirm"
          label="Leave a Comment"
          onClick={() => confirmHandler(textInput)}
          variant="primary"
          size="small"
        />
      </DialogActions>
    </Dialog>
  );
};

export default OptCommentComponent;
