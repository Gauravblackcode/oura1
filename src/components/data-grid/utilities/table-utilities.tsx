import { get } from 'lodash';
import { Column } from '../types';

export const align = (col: Partial<Column>) => col.align ?? 'left';

export const getProps = (col: Partial<Column>, commonStyles?: string) => {
  const {
    minWidth: _minWidth,
    maxWidth: _maxWidth,
    pinned: _pinned,
    label: _label,
    className,
    sort: _sort,
    apply: _apply,
    Component: _Component,
    key: _key,
    ...rest
  } = col;
  return {
    className: `${className || ''} ${commonStyles || ''}`,
    ...rest,
  };
};

export const extract = (row: any, rowIndex: number, col: Column, _colIndex: number) => {
  const { Component, apply, getValue, key } = col;
  const value = get(row, key);
  if (Component) {
    return <Component row={row} />;
  }
  if (typeof apply === 'function') {
    return apply(row, rowIndex);
  }
  if (typeof getValue === 'function') {
    const cellValue = getValue(row);
    return <p>{cellValue}</p>;
  }
  return <p>{value || col.defaultValue || '--'}</p>;
};

export const sortRows = (data: any[], sortBy: any) => {
  const $data = [...(data || [])];
  $data.sort((prev, next) => {
    const pevVal = get(prev, sortBy.by);
    const nextVal = get(next, sortBy.by);
    const isGreaterThan = pevVal < nextVal;
    switch (sortBy.type) {
      case 'asc':
      case '+':
        return isGreaterThan ? -1 : 1;
      case 'desc':
      case '-':
        return isGreaterThan ? 1 : -1;
      default:
        return isGreaterThan ? -1 : 1;
    }
  });
  return $data;
};

export const paginateData = (data: any[], pageNo: number, pageSize: number) => {
  const $data = [...data];
  const limit = pageNo * pageSize;
  const skip = (pageNo - 1) * pageSize;
  return $data.slice(skip, limit);
};

export const getRowId = (row: any, idKey: string) => (idKey ? row[idKey] : row.uniqueId);

export const getPinnedPosition = (columns: Column[], config?: { showCheckbox?: boolean }) => {
  return (
    columns.reduce((acc, item) => acc + (item.maxWidth ?? item.minWidth ?? 0), 0) + (config?.showCheckbox ? 75 : 0)
  );
};
