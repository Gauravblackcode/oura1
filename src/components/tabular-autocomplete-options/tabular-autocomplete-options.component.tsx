import {
  AutocompleteRenderOptionState,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { CircularProgress } from '@/lib/material-ui';
import { CheckIcon, CloseIcon } from '@/lib/icons';
import containerStyles from '../../modules/reporting/styles/reporting-form.module.scss';
import styles from './tabular-autocomplete-options.module.scss';

interface IOptionsHeader {
  columnHeaders: string[];
}

interface IInfiniteScrollOptionsHeader {
  columnHeaders: string[];
  tBodyRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  endReached: boolean;
}

interface IBodyItem {
  key: string;
  apply?: (value: string) => string | JSX.Element;
  tooltip?: (value: string) => string;
}

interface ISelectedOptionsProps {
  columnBody: IBodyItem[];
  columnHeaders: string[];
  selectedOptions: any[];
  onDelete: (value: any) => void;
  onSelectionPropsClick?: (value: any) => void;
  isActionable?: (value: any) => boolean;
}

interface IOptionsBody {
  optionProps: HTMLAttributes<HTMLLIElement>;
  columnBody: IBodyItem[];
  state: AutocompleteRenderOptionState;
  option: { label: string; value: any };
  isActionable?: (item: any) => boolean;
}

export const OptionsHeader: React.FC<PropsWithChildren<IOptionsHeader>> = ({ children, columnHeaders }) => {
  return (
    <TableContainer style={{ maxHeight: '600px' }}>
      <Table stickyHeader className={styles.container}>
        <TableHead>
          <TableRow>{columnHeaders?.map((item: string) => <TableCell key={item}>{item}</TableCell>)}</TableRow>
        </TableHead>

        <TableBody className={styles.body_container}>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export const InfiniteScrollOptionsHeader: React.FC<PropsWithChildren<IInfiniteScrollOptionsHeader>> = React.memo(
  ({ columnHeaders, tBodyRef, handleScroll, children, endReached }) => {
    return (
      <TableContainer onScroll={handleScroll} style={{ maxHeight: '300px' }} ref={tBodyRef}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>{columnHeaders?.map((item: string) => <TableCell key={item}>{item}</TableCell>)}</TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
        {!endReached && (
          <div className={styles.pagination_loader}>
            <CircularProgress size={20} color="primary" />
          </div>
        )}
      </TableContainer>
    );
  },
);

InfiniteScrollOptionsHeader.displayName = 'InfiniteScrollOptionsHeader';

export const OptionsBody: React.FC<IOptionsBody> = ({
  optionProps: { onClick, ...restOptionProps },
  option: { value, ...restOption },
  state,
  columnBody,
  isActionable = () => true,
}) => {
  return (
    <TableRow
      {...restOptionProps}
      {...(isActionable({ value, ...restOption }) ? { onClick } : undefined)}
      component="li"
    >
      {columnBody?.map((item: any) => (
        <TableCell key={item.key}>{item.apply ? item.apply(value[item.key]) : value[item.key] || '--'}</TableCell>
      ))}
      <TableCell>{state.selected && <CheckIcon width={20} height={15} />}</TableCell>
    </TableRow>
  );
};

export const SelectedOptions = ({
  selectedOptions,
  onDelete,
  columnBody,
  columnHeaders,
  onSelectionPropsClick,
  isActionable = () => true,
}: ISelectedOptionsProps) => {
  return (
    <div className={containerStyles.auto_complete}>
      <div className={containerStyles.selected_header}>
        {columnHeaders?.map(item => <span key={item}>{item}</span>)}
      </div>
      <div className={containerStyles.selected_body}>
        {selectedOptions?.map(item =>
          item.value ? (
            <div key={`${item.value.name}${item.value.id}`} className={containerStyles.row_item}>
              {columnBody.map(({ key, apply, tooltip }) => (
                <Tooltip key={key} title={tooltip ? tooltip(item.value[key]) : ''} placement="top">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={onSelectionPropsClick ? () => onSelectionPropsClick(item.value[key]) : () => {}}
                  >
                    {apply ? apply(item.value[key]) : item.value[key]}
                  </span>
                </Tooltip>
              ))}
              <Tooltip title="Delete" placement="top">
                <CloseIcon
                  className={containerStyles.action_icon}
                  data-disabled={!isActionable(item)}
                  {...(isActionable(item) && { onClick: () => onDelete(item) })}
                />
              </Tooltip>
            </div>
          ) : (
            <div key={item} className={containerStyles.row_item}>
              {columnBody.map(({ key, apply, tooltip }) => (
                <Tooltip key={key} title={tooltip ? tooltip(item.value[key]) : ''} placement="top">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={onSelectionPropsClick ? () => onSelectionPropsClick(item) : () => {}}
                  >
                    {apply ? apply(item) : item}
                  </span>
                </Tooltip>
              ))}
              <Tooltip title="Delete" placement="top">
                <CloseIcon onClick={() => onDelete(item)} />
              </Tooltip>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

SelectedOptions.defaultProps = {
  onSelectionPropsClick: () => {},
};
