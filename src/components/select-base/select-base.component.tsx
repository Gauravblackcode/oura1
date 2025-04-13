import * as React from 'react';
import { Select, MenuItem, SelectProps } from '@/lib/material-ui';
import { ChevronDownIcon } from '@/lib/icons';
import useOnScreen from '@/contexts/on-Screen/onScreen.hook';
import styles from './select-base.module.scss';

interface ISelectBase<T> extends SelectProps<T> {
  options: T[];
  value: any;
  getValueKey?: keyof T;
  renderItem?: (item: T) => React.ReactElement | string;
  defaultValue?: any;
}

const CustomChevronDownIcon = ({ color, ...btnProps }: any) => (
  <ChevronDownIcon {...btnProps} color={color || '#AFAFAF'} />
);

const SelectBase = <T extends unknown>(props: ISelectBase<T>) => {
  const { className = '', options, getValueKey, renderItem, value: propsValues, defaultValue = 'all', ...rest } = props;

  // Use defaultValue if provided, otherwise use propsValues
  const initialValue = defaultValue !== undefined ? defaultValue : propsValues;

  const [value, setValue] = React.useState(propsValues || '');
  const getPickerValue = (opt: any) => opt[getValueKey];
  const inputRef = React.useRef();
  const isVisible = useOnScreen(inputRef);

  React.useEffect(() => {
    // Update the internal state when the external value changes
    if (propsValues !== undefined) {
      setValue(propsValues || '');
    } else {
      setValue(initialValue);
    }
  }, [propsValues, defaultValue]);

  return (
    <Select
      {...rest}
      value={isVisible ? value : ''}
      MenuProps={{
        disableScrollLock: true,
        PaperProps: {
          sx: {
            display: !isVisible ? 'none' : 'block',
            maxHeight: '370px',
          },
        },
        ...(rest.MenuProps ?? {}),
      }}
      classes={{
        select: styles.input,
        ...(rest.classes ?? {}),
      }}
      ref={inputRef}
      IconComponent={CustomChevronDownIcon}
      className={`${styles.select} ${className}`}
    >
      {isVisible &&
        Array.isArray(options) &&
        options?.map((opt, index) => (
          <MenuItem key={`${getPickerValue(opt)}_${index}`} value={getPickerValue(opt)} data-testid={renderItem?.(opt)}>
            {renderItem?.(opt)}
          </MenuItem>
        ))}
    </Select>
  );
};

SelectBase.defaultProps = {
  getValueKey: 'value',
  renderItem: (item: any) => item.label,
  defaultValue: 'all',
};

export default SelectBase;
