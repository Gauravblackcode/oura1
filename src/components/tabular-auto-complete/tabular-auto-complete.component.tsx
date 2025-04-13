import React, { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { uniqBy } from 'lodash';
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
import {
  InfiniteScrollOptionsHeader,
  OptionsBody,
  OptionsHeader,
  // OptionsHeader,
  SelectedOptions,
} from '@/components/tabular-autocomplete-options/tabular-autocomplete-options.component';
import DateTimeParser from '@/lib/date-time-parser';
import { DATE_FORMAT } from '@/common/constants';
import Button from '../button/button.component';
import styles from '../auto-complete/auto-complete.module.scss';
import { Oura1Input } from '../input';

type IListOption<T> =
  | {
      label: string;
      value: T;
    }
  | T;

type TRenderSelectOption<T> = {
  selectedOptions: IListOption<T>[];
  onDelete: (value: T) => void;
  getChipsLabel?: (value: T) => string;
  onSelectionPropsClick?: (value: T) => string;
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
  const { onDelete, getChipsLabel, selectedOptions } = props;
  return (
    <div className={styles.chip_wrapper}>
      {selectedOptions.map((item, index) => (
        <div key={`${getChipsLabel?.(item) || item.label}_${index}`} className={styles.chip}>
          <p>{getChipsLabel?.(item) || item.label}</p>
          <CloseIcon onClick={() => onDelete(item)} size={14} />
        </div>
      ))}
    </div>
  );
};

type TSelectedOptionsVariant = 'chips' | 'table';

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

interface ITabularAutoCompleteProps<T> {
  showPicker?: boolean;
  showClearAllButton?: boolean;
  multiple?: boolean;
  inputProps?: Omit<TextFieldProps, 'onChange'>;
  options?: IListOption<T>[];
  testId?: string;
  selectedOptions?: T[];
  getChipsLabel?: (option: T) => string;
  autoCompleteProps?: Omit<AutocompleteProps<T, boolean, any, any>, 'renderInput' | 'options'>;
  handleSearch?: (searchText: string) => void;
  onSelectionChange?: (newValue: IListOption<T>[], op?: 'select' | 'remove') => void;
  renderSelectedOptions?: (props: TRenderSelectOption<T>) => React.ReactNode;
  onSelectionPropsClick?: (option: T) => void;
  renderOptions?: (
    option: T,
    state: AutocompleteRenderOptionState,
    ownerState: any,
    getOptionLabel?: (option: T | string) => void,
  ) => React.ReactNode;
  disabled?: boolean;
  selectedOptionsForm?: TSelectedOptionsVariant;
  columnHeaders?: any;
  columnBody?: any;
  infiniteScroll?: boolean;
  onPageUpdate?: (val: number) => void;
  totalCount?: number | null;
  isActionable?: (item: T) => boolean;
}

const TabularAutoComplete: React.FC<ITabularAutoCompleteProps<any>> = <
  T extends string | number | { [key: string]: any },
>(
  props: ITabularAutoCompleteProps<T>,
) => {
  const {
    multiple,
    showPicker,
    showClearAllButton,
    inputProps,
    options,
    testId,
    selectedOptions,
    onSelectionPropsClick,
    getChipsLabel,
    handleSearch,
    renderSelectedOptions,
    onSelectionChange,
    selectedOptionsForm,
    columnHeaders,
    columnBody,
    disabled,
    infiniteScroll,
    onPageUpdate,
    totalCount,
    isActionable = () => true,
    autoCompleteProps = {},
  } = props;
  const [searchText, setSearchText] = useState<string | undefined>((inputProps?.value as string) ?? '');
  const [selectedOps, setSelectedOps] = useState(selectedOptions);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tBodyRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>();

  useEffect(() => {
    setSelectedOps(selectedOptions);
  }, [selectedOptions]);

  const handleOptionSelect = (value: T[]) => {
    if (tBodyRef.current) {
      scrollPositionRef.current = tBodyRef.current.scrollTop;
    }
    setSelectedOps(uniqBy(value, 'value.id'));
  };

  useEffect(() => {
    if (tBodyRef.current && scrollPositionRef.current) {
      tBodyRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [selectedOps]);

  const debouncedSearch = useMemo(
    () =>
      debounce(search => {
        if (handleSearch) {
          handleSearch(search);
        }
      }, 1000),
    [handleSearch],
  );

  const handleSearchTextChange = (search?: string) => {
    setSearchText(search);
    setScrollPosition(0);
    debouncedSearch(search);
  };

  const handleClearClick = () => {
    setIsDropdownVisible(false);
    setSelectedOps(selectedOptions);
  };

  const handleApplyClickLocal = () => {
    setIsDropdownVisible(false);
    let selection: IListOption<T>[];
    if (selectedOps) {
      selection = Array.isArray(selectedOps) ? selectedOps : [selectedOps];
    } else {
      selection = [];
    }
    onSelectionChange?.(selection, 'select');
  };

  const onDelete = (deletedValue: any) => {
    const newOptions = (selectedOptions as any[])?.filter(item => item.value.id !== deletedValue.value.id);
    setSelectedOps(newOptions);
    onSelectionChange?.(newOptions, 'remove');
  };

  const [page, setPage] = useState(1);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = tBodyRef.current!;
    const threshold = 50; // Adjust threshold as needed
    if (scrollHeight - scrollTop - clientHeight <= threshold && options && totalCount && options?.length < totalCount) {
      setScrollPosition(scrollHeight - 400);
      const nextPage = page + 1;
      setPage(nextPage);
      onPageUpdate?.(nextPage);
    }
  };

  useEffect(() => {
    if (tBodyRef.current) {
      tBodyRef.current.scrollTop = scrollPosition;
    }
  }, [options]);

  const getTabularAutoCompleteProps = () => ({
    getOptionLabel: (opt: any) => opt.label,
    ListboxComponent: ({ children }: any) =>
      infiniteScroll ? (
        <InfiniteScrollOptionsHeader
          handleScroll={handleScroll}
          tBodyRef={tBodyRef}
          columnHeaders={columnHeaders}
          endReached={options?.length === totalCount}
        >
          {children}
        </InfiniteScrollOptionsHeader>
      ) : (
        <OptionsHeader columnHeaders={columnHeaders}>{children}</OptionsHeader>
      ),
    renderOption: (optionProps: any, option: any, state: any, ownerState: any) => (
      <OptionsBody
        columnBody={columnBody}
        optionProps={optionProps}
        option={option}
        isActionable={isActionable}
        state={{
          ...state,
          selected:
            ownerState?.value.filter(
              (item: any) =>
                item?.value?.id === option.value.id ||
                (item?.value?.email && item?.value?.email === option.value.email),
            ).length > 0,
        }}
      />
    ),
  });

  return (
    <div className={styles.container}>
      <MaterialAutocomplete
        {...autoCompleteProps}
        multiple={Boolean(multiple)}
        fullWidth
        data-testid={testId}
        disabled={disabled}
        open={isDropdownVisible && showPicker}
        onOpen={() => setIsDropdownVisible(true)}
        value={selectedOps}
        onBlur={() => {
          handleClearClick();
          handleSearchTextChange();
        }}
        options={options ?? ([] as any)}
        onChange={(_event, value) => handleOptionSelect(value as any)}
        PaperComponent={PaperComponent}
        slotProps={{
          paper: {
            handleClearClick,
            handleApplyClickLocal,
          } as PaperProps,
        }}
        disableCloseOnSelect
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
        {...getTabularAutoCompleteProps()}
      />
      {!!selectedOptions?.length && (
        <div className={styles.selected_ops_container}>
          {selectedOptionsForm === 'table' ? (
            <SelectedOptions
              columnHeaders={columnHeaders}
              columnBody={columnBody}
              selectedOptions={selectedOptions}
              onDelete={onDelete}
              onSelectionPropsClick={onSelectionPropsClick}
              isActionable={isActionable}
            />
          ) : (
            renderSelectedOptions?.({ selectedOptions, getChipsLabel, onDelete })
          )}
          {showClearAllButton && <MuiButton onClick={() => onSelectionChange?.([])}>Clear All</MuiButton>}
        </div>
      )}
    </div>
  );
};

TabularAutoComplete.defaultProps = {
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
  getChipsLabel: option => option.label,
  handleSearch: () => {},
  onSelectionChange: () => {},
  onSelectionPropsClick: () => {},
  renderOptions: defaultListRender,
  renderSelectedOptions: defaultSelectedOptionRender,
  selectedOptionsForm: 'table',
  disabled: false,
  testId: '',
  columnBody: [
    { key: 'name' },
    { key: 'advertiserName' },
    {
      key: 'startDate',
      apply: (value: string) => (value ? DateTimeParser(value).format(DATE_FORMAT.MMM_DD_YYYY) : '--'),
    },
    {
      key: 'endDate',
      apply: (value: string) => (value ? DateTimeParser(value).format(DATE_FORMAT.MMM_DD_YYYY) : '--'),
    },
  ],
  columnHeaders: ['Name', 'Advertiser', 'Start Date', 'End Date', 'Selected'],
  infiniteScroll: false,
  onPageUpdate: () => {},
  totalCount: 100,
};

export default TabularAutoComplete;
