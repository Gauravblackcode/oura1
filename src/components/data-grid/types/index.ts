import { CSSProperties, ReactElement } from 'react';
import { PaginationArguments, PaginationProps, TSortState } from '@/types/common';

export type AlignType = 'left' | 'center' | 'right';

export type Column<T = { [key: string]: any }> = {
  label: string | ReactElement | undefined | null;
  key: string;
  className?: string;
  sort?: boolean;
  pinned?: boolean;
  editable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  defaultValue?: string;
  /**
   * Get raw value
   */
  getValue?: (row: T) => string | number | boolean | undefined;
  /**
   * Render custom React Component
   */
  apply?: (row: T, index: number) => ReactElement;
  Component?: (props: { row: T }) => ReactElement<{ row: T }>;
  align?: AlignType;
  hidden?: boolean;
  style?: CSSProperties;
};

export type DataTableProps<T = any> = {
  classes: {
    root?: string;
    theadRow?: string;
    tBodyRow?: string;
    th?: string;
    td?: string;
  };
  sortBy: TSortState;
  handleSort: (column: T) => void;
  columns: Column<T>[];
  data: any[];
  idKey: string;
  dense?: boolean;
  isLoading: boolean;
  onRowClick?: (row: any) => void;
  maxHeight?: number | string | false;
  minHeight?: string | number | null;
  showCheckbox?: boolean;
  checkedItems?: any[];
  noBorder?: boolean;
  design?: string; //TODO - Selvam - design prop can be removed after new design is implemented
  onCheckboxClick: (row?: any) => void;
  isCheckboxDisabled?: (row: T) => boolean;
};

export type DataGridProps<T = any> = {
  classes?: {
    root?: string;
    theadRow?: string;
    tBodyRow?: string;
    th?: string;
    td?: string;
    perPageStyle?: string;
  };
  columns: Column<T>[];
  tableTitle?: string;
  data: T[];
  idKey: string;
  // orderBy?: SortByFilters<T>;
  dense?: boolean;
  pagination?: PaginationProps;
  sortBy?: TSortState;
  onPaginationChange?: (values: PaginationArguments) => void;
  isLoading?: boolean;
  maxHeight?: number | string;
  gridHelperPosition?: 'top' | 'bottom';
  onRowClick?: (row: any) => void;
  pageSizeOptions?: number[] | string[];
  defaultPageNo?: number;
  defaultPageSize?: number;
  minHeight?: 'auto' | string | number | null;
  noBorder?: boolean;
  /**
   * disables pagination
   */
  infinite?: boolean;
  /**
   * For DataTable
   */
  showPerPage?: boolean;
  showCheckbox?: boolean;
  isCheckboxDisabled?: (row: T) => boolean;
  renderHeader?: (props: TTableHeaderProps) => React.ReactElement;
  fallbackContent?: { title?: string; description?: string } | string;
  design?: string; //TODO - Selvam - design prop can be removed after new design is implemented
};

export type TTableHeaderProps = { checkedItems: any[]; updateCheckedItems: (newValue: any) => void };
