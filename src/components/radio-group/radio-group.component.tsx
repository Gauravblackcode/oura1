import { ReactElement } from 'react';
import {
  FormControlLabel,
  RadioGroup as MUIRadioGroup,
  Radio,
  FormControlLabelProps,
  RadioGroupProps,
} from '@/lib/material-ui';
import styles from './radio-group.module.scss';

export interface IRadioOption<T> {
  label: string | ReactElement;
  value: T;
  additionalProps?: Partial<FormControlLabelProps>;
}

export interface IRadioGroup<T> extends RadioGroupProps {
  value: any;
  options: IRadioOption<T>[];
  disabled?: boolean;
  renderOption?: (item: T) => React.ReactElement;
  onValueChange: (newValue: T) => void;
}

const RadioGroup: React.FC<IRadioGroup<any>> = <T extends string | number | { [key: string]: any }>(
  props: IRadioGroup<T>,
) => {
  const { value, disabled, options, renderOption, onValueChange, ...radioGroupProps } = props;
  return (
    <MUIRadioGroup
      row
      className={`${styles.container} ${radioGroupProps.className ?? ''}`}
      value={value}
      onChange={({ target }) => onValueChange(target.value as any)}
      {...radioGroupProps}
    >
      {options.map(item => (
        <FormControlLabel
          key={item.value as number | string}
          label={renderOption ? renderOption(item as any) : item.label}
          value={item.value}
          checked={item.value === value}
          control={<Radio />}
          data-testid={item.label}
          {...item.additionalProps}
          disabled={item.additionalProps?.disabled || disabled}
        />
      ))}
    </MUIRadioGroup>
  );
};

RadioGroup.defaultProps = {
  renderOption: undefined,
  disabled: false,
};

export default RadioGroup;
