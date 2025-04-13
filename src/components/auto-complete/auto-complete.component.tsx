import React, { useEffect, useRef, useState } from 'react';
import _, { isEmpty, isEqual } from 'lodash';
import { PaperProps } from '@mui/material';
import {
  InputAdornment,
  Autocomplete as MaterialAutocomplete,
  TextFieldProps,
  AutocompleteProps,
  AutocompleteRenderOptionState,
  Paper,
  Button as MuiButton,
} from '@/lib/material-ui';
import { CheckIcon, CloseIcon, PlusIcon, SearchIcon } from '@/lib/icons';
import { colors } from '@/lib/material-ui/theme';
import Button from '../button/button.component';
import { LabelToolTip } from '../tooltip';
import { Oura1Input } from '../input';
import styles from './auto-complete.module.scss';

type IListOption<T> =
  | {
      label: string;
      value: T;
    }
  | T;

type TRenderSelectOption<T> = {
  customClassName?: string;
  selectedOptions: IListOption<T>[];
  onDelete: (value: T) => void;
  getChipsLabel?: (value: T) => string;
  onSelectionPropsClick?: (value: T) => string;
  disabled?: boolean;
};

const defaultListRender = (
  option: any,
  { selected }: AutocompleteRenderOptionState,
  _ownState: any,
  getOptionLabel: any,
) => {
  return (
    <>
      <p className={styles.option_title}>{typeof option.label === 'string' ? option.label : getOptionLabel(option)}</p>
      {selected ? (
        <CheckIcon width={18} height={18} className={styles.check_icon} />
      ) : (
        <div className={styles.check_icon} />
      )}
    </>
  );
};

const defaultSelectedOptionRender = (props: TRenderSelectOption<any>) => {
  const { onDelete, getChipsLabel, selectedOptions, disabled, customClassName } = props;
  const getLabel = (item: any): string => getChipsLabel?.(item) || item?.label || '';
  return (
    <div className={`${styles.chip_wrapper} ${customClassName}`}>
      {selectedOptions.map((item, index) => (
        <div key={`${getLabel(item)}_${index}`} className={styles.chip}>
          <LabelToolTip labelClassName={styles.chip_text} label={getLabel(item)} />
          {!disabled && <CloseIcon onClick={() => onDelete(item)} size={14} />}
        </div>
      ))}
    </div>
  );
};

const PaperComponent: React.FC<any> = React.memo(({ children, ...props }) => {
  return (
    <Paper className={styles.paper} onMouseDown={event => event.preventDefault()}>
      <div className={styles.paper_children}>{children}</div>
      <div className={styles.action_items}>
        <Button
          title="Close"
          IconComponent={() => <CloseIcon size={16} />}
          variant="secondary"
          onClick={() => props.handleClearClick()}
        />
        <Button
          data-testid="add-new-button"
          title="Add"
          IconComponent={() => <PlusIcon size={16} />}
          variant="primary"
          onClick={() => props.handleApplyClickLocal()}
        />
      </div>
    </Paper>
  );
});

interface IAutoCompleteProps<T> {
  testId?: string;
  customClassName?: string;
  showPicker?: boolean;
  showClearAllButton?: boolean;
  multiple?: boolean;
  inputProps?: Omit<TextFieldProps, 'onChange'>;
  options?: IListOption<T>[];
  selectedOptions?: T[];
  getChipsLabel?: (option: T) => string;
  autoCompleteProps?: Omit<AutocompleteProps<T, boolean, any, any>, 'renderInput' | 'options'> & {
    getOptionLabel: (option: T) => string;
  };
  handleSearch?: (searchText: string) => void;
  onSelectionChange?: (newValue: IListOption<T>[]) => void;
  renderSelectedOptions?: (props: TRenderSelectOption<T>) => React.ReactNode;
  onSelectionPropsClick?: (option: T) => string;
  handleScroll?: () => void;
  renderOptions?: (
    option: T,
    state: AutocompleteRenderOptionState,
    ownerState: any,
    getOptionLabel?: (option: T | string) => void,
  ) => React.ReactNode;
  disabled?: boolean;
}

const AutoComplete: React.FC<IAutoCompleteProps<any>> = <T extends string | number | { [key: string]: any }>(
  props: IAutoCompleteProps<T>,
) => {
  const {
    testId,
    customClassName,
    multiple,
    showPicker,
    showClearAllButton,
    inputProps,
    options,
    selectedOptions,
    autoCompleteProps,
    onSelectionPropsClick,
    getChipsLabel,
    handleSearch,
    renderOptions,
    renderSelectedOptions,
    onSelectionChange,
    disabled,
    handleScroll,
  } = props;
  const [searchText, setSearchText] = useState<string>((inputProps?.value as string) ?? '');
  const [selectedOps, setSelectedOps] = useState(selectedOptions);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOps(selectedOptions);
  }, [selectedOptions]);

  const handleOptionSelect = (value: T[]) => {
    if (value) {
      setSelectedOps(Array.isArray(value) ? value : [value]);
    }
  };

  const debouncedSearch = React.useMemo(
    () =>
      _.debounce(search => {
        if (handleSearch) {
          handleSearch(search);
        }
      }, 1000),
    [handleSearch],
  );

  const handleSearchTextChange = (search: string) => {
    setSearchText(search);
    setScrollPosition(0);
    debouncedSearch(search);
  };

  const handleClearClick = () => {
    setDropdownVisible(false);
    setSelectedOps(selectedOptions);
  };

  const handleApplyClickLocal = () => {
    setDropdownVisible(false);
    const selection = selectedOps ? (Array.isArray(selectedOps) ? selectedOps : [selectedOps]) : [];
    onSelectionChange?.(selection);
  };

  const onDelete = (deletedValue: any) => {
    const newOptions = (selectedOptions as any[])?.filter(
      item => !isEqual(item.value || item, deletedValue.value || deletedValue),
    );
    setSelectedOps(newOptions);
    onSelectionChange?.(newOptions);
  };

  const onScrollLocal = (scroll: any) => {
    const { scrollTop, clientHeight, scrollHeight } = scroll;
    const currPosition = Math.floor(scrollHeight - scrollTop);
    if (currPosition - clientHeight <= 1 && handleScroll) {
      setScrollPosition(prev => prev + currPosition);
      handleScroll();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollPosition;
    }
  }, [options]);

  return (
    <div className={styles.container}>
      <MaterialAutocomplete
        className={customClassName}
        data-testid={testId}
        multiple={Boolean(multiple)}
        fullWidth
        disabled={disabled}
        open={isDropdownVisible && showPicker}
        onOpen={() => setDropdownVisible(true)}
        value={selectedOps}
        options={options ?? ([] as any).filter((item: any) => !isEmpty(item))}
        onChange={(_event, value) => handleOptionSelect(value as any)}
        PaperComponent={PaperComponent}
        slotProps={{
          paper: {
            handleClearClick,
            handleApplyClickLocal,
          } as PaperProps,
        }}
        ListboxProps={{
          onScroll: ({ currentTarget }) => {
            onScrollLocal(currentTarget);
          },
          ref: listRef,
        }}
        renderOption={(optionProps, ...rest) => (
          <li
            {...optionProps}
            className={`${optionProps.className} ${styles.option_item}`}
            data-active={rest[1].selected}
          >
            {renderOptions?.(...rest, autoCompleteProps?.getOptionLabel)}
          </li>
        )}
        disableCloseOnSelect
        clearOnBlur={false}
        clearOnEscape={false}
        renderInput={params => {
          const properties = { ...params };
          properties.InputProps.startAdornment = (
            <InputAdornment position="start">
              <SearchIcon width={18} height={18} />
            </InputAdornment>
          );
          properties.InputProps.endAdornment = undefined;
          return (
            <Oura1Input
              {...properties}
              {...inputProps}
              value={searchText}
              onChange={({ target }) => handleSearchTextChange(target.value)}
            />
          );
        }}
        {...autoCompleteProps}
        onBlur={e => {
          setDropdownVisible(false);
          if (autoCompleteProps?.onBlur) {
            autoCompleteProps.onBlur(e);
          }
        }}
      />
      {!!selectedOptions?.length && (
        <div className={styles.selected_ops_container}>
          {renderSelectedOptions?.({
            selectedOptions,
            customClassName,
            getChipsLabel,
            onDelete,
            onSelectionPropsClick,
            disabled,
          })}
          {showClearAllButton && !disabled && (
            <MuiButton
              onClick={() => onSelectionChange?.([])}
              sx={{
                textTransform: 'none',

                borderLeft: `1px solid ${colors.grey700}`,
                width: '150px',
              }}
            >
              Clear All
            </MuiButton>
          )}
        </div>
      )}
    </div>
  );
};

AutoComplete.defaultProps = {
  testId: '',
  customClassName: '',
  showPicker: true,
  multiple: true,
  showClearAllButton: true,
  inputProps: {
    placeholder: 'Search',
  },
  options: [],
  selectedOptions: [],
  autoCompleteProps: {
    getOptionLabel: option => option?.label || '',
  },
  getChipsLabel: option => option?.label,
  handleSearch: () => {},
  onSelectionChange: () => {},
  onSelectionPropsClick: () => '',
  renderOptions: defaultListRender,
  renderSelectedOptions: defaultSelectedOptionRender,
  handleScroll: () => {},
  disabled: false,
};

export default AutoComplete;
