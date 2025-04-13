import { PropsWithChildren, memo, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Autocomplete, AutocompleteProps, CircularProgress, Paper, TextFieldProps } from '@/lib/material-ui';
import { Oura1Input } from '../input';
import styles from './singular-auto-complete.module.scss';

interface ISingularAutoCompleteProps<T> {
  testId?: string;
  disabled?: boolean;
  options: T[];
  value?: T | null;
  autoCompleteProps: Omit<AutocompleteProps<T, boolean, boolean, boolean>, 'renderInput' | 'disabled' | 'options'>;
  renderInputProps?: TextFieldProps;
  handleScroll?: () => void;
  handleSearch?: (searchText: string) => void;
}

const PaperComponent: React.FC<PropsWithChildren<any>> = memo(({ children, isLoading }) => {
  return (
    <Paper className={styles.paper} onMouseDown={event => event.preventDefault()}>
      <div>{children}</div>
      {isLoading && (
        <div className={styles.spinner_wrapper}>
          <CircularProgress size="18px" />
        </div>
      )}
    </Paper>
  );
});

const SingularAutoComplete: React.FC<ISingularAutoCompleteProps<any>> = <
  T extends string | number | { [key: string]: any },
>(
  props: ISingularAutoCompleteProps<T>,
) => {
  const { disabled, testId, value, options, autoCompleteProps, renderInputProps, handleSearch, handleScroll } = props;
  const [searchText, setSearchText] = useState<string>('');
  // const [scrollPosition, setScrollPosition] = useState<number>(0);
  const listRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(search => {
        if (handleSearch) {
          handleSearch(search);
        }
      }, 1000),
    [handleSearch],
  );

  const handleSearchTextChange = (search: string) => {
    setSearchText(search);
    // setScrollPosition(0);
    debouncedSearch(search);
  };

  const onScrollLocal = (scroll: EventTarget & HTMLUListElement) => {
    const { scrollTop, clientHeight, scrollHeight } = scroll;
    const currPosition = Math.floor(scrollHeight - scrollTop);
    if (currPosition - clientHeight <= 1 && handleScroll) {
      // setScrollPosition(prev => prev + currPosition);
      handleScroll();
    }
  };

  // useEffect(() => {
  //   // To Stop jumping to TOP, When Appending new data,
  //   if (listRef.current) {
  //     listRef.current.scrollTop = scrollPosition;
  //   }
  // }, [options]);

  return (
    <Autocomplete
      data-testid={testId}
      options={options}
      PaperComponent={PaperComponent}
      disabled={disabled}
      slotProps={{
        paper: {
          isLoading: autoCompleteProps?.loading,
        } as any,
      }}
      ListboxProps={{
        onScroll: ({ currentTarget }) => {
          onScrollLocal(currentTarget);
        },
        ref: listRef,
      }}
      value={value}
      onInputChange={(_event, _value, reason) => {
        if (reason === 'clear') {
          handleSearchTextChange(_value);
        }
      }}
      renderInput={params => (
        <Oura1Input
          {...params}
          {...renderInputProps}
          value={searchText}
          onChange={({ target }) => handleSearchTextChange(target.value)}
        />
      )}
      {...autoCompleteProps}
    />
  );
};

SingularAutoComplete.defaultProps = {
  testId: undefined,
  value: null,
  disabled: false,
  renderInputProps: {},
  handleScroll: () => {},
  handleSearch: () => {},
};

export default SingularAutoComplete;
