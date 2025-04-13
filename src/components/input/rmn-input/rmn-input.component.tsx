import { useRef } from 'react';
import { TextField, TextFieldProps } from '@/lib/material-ui';
import styles from './rmn-input.module.scss';

const UNICODE_REGEX = /[^\x00-\x7F]/g;

const Oura1Input: React.FC<TextFieldProps> = props => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = () => {
    const input = inputRef.current;

    if (input) {
      const newValue = input.value;
      if (newValue.match(UNICODE_REGEX)) {
        const filteredValue = newValue.replace(UNICODE_REGEX, '');
        input.value = filteredValue;
      }
    }
  };

  return (
    <TextField
      variant="outlined"
      classes={{
        root: styles.root,
      }}
      {...props}
      inputRef={inputRef}
      onInput={handleInput}
      InputProps={{
        classes: {
          notchedOutline: styles.notched_outline,
          input: styles.input,
          disabled: styles.disabled,
        },
        ...(props.InputProps ?? {}),
      }}
    />
  );
};

export default Oura1Input;
