import React from 'react';
import { Chip, MenuItem, Select, SelectProps, Stack } from '@mui/material';
import { Check } from 'lucide-react';
import { CloseIcon } from '@/lib/icons';
import useOnScreen from '@/contexts/on-Screen/onScreen.hook';
import styles from '../select-base/select-base.module.scss';

interface optionType {
  label: string;
  value: string;
}

interface ISelectBaseMultipleProps<T> extends SelectProps<T> {
  options: T[] & optionType[];
  value: any;
  className?: string | undefined;
  onChange: (value: any) => void;
}

const SelectBaseMultiple = <T extends unknown>(props: ISelectBaseMultipleProps<T>) => {
  const { className = '', onChange, options, value: initialValue = '', renderValue, ...rest } = props;
  const inputRef = React.useRef();
  const isVisible = useOnScreen(inputRef);

  return (
    <Select
      {...rest}
      multiple
      value={initialValue as '' | T | undefined}
      MenuProps={{
        disableScrollLock: true,
        PaperProps: {
          sx: {
            display: !isVisible ? 'none' : 'block',
            maxHeight: '370px',
          },
        },
      }}
      ref={inputRef}
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
      renderValue={
        renderValue ||
        ((selected: any) => (
          <div className={styles.chipsContainer}>
            <Stack gap={1} direction="row" sx={{ overflowX: 'auto', flexWrap: 'wrap' }}>
              {selected?.map((option: string) => (
                <Chip
                  key={option}
                  label={options.filter((el: optionType) => el.value === option)[0].label}
                  onDelete={() => onChange(initialValue.filter((item: string) => item !== option))}
                  deleteIcon={<CloseIcon onMouseDown={event => event.stopPropagation()} />}
                />
              ))}
            </Stack>
          </div>
        ))
      }
      classes={{
        select: styles.input,
        ...(rest.classes ?? {}),
      }}
      className={`${styles.select} ${className}`}
    >
      {options.length > 0 &&
        options.map((option: optionType) => (
          <MenuItem key={option.label} value={option.value} sx={{ justifyContent: 'space-between' }}>
            {option.label}
            {initialValue.includes(option.value) ? <Check color="info" /> : null}
          </MenuItem>
        ))}
    </Select>
  );
};

SelectBaseMultiple.defaultProps = {
  className: '',
};

export default SelectBaseMultiple;
