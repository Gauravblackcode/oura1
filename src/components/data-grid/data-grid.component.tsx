import React, { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
import { Pagination, TableContainer, PaginationItem } from '@/lib/material-ui';
import { TSortState } from '@/types/common';
import { ChevronDownIcon } from '@/lib/icons';
import EmptyListImage from '@/assets/images/empty-list.svg';
import MoreMenu from '../menu/menu.component';
import DataTable from './data-table/data-table.component';
import { Column, DataGridProps } from './types';
import { sortRows, paginateData } from './utilities/table-utilities';
import styles from './data-grid.module.scss';

const DataGrid: React.FC<DataGridProps> = (props: DataGridProps) => {
  const {
    classes = {
      root: '',
      tBodyRow: '',
      td: '',
      th: '',
      theadRow: '',
      perPageStyle: '',
    },
    columns = [],
    data = [],
    tableTitle,
    pagination,
    onPaginationChange,
    defaultPageNo,
    defaultPageSize,
    pageSizeOptions = ['10', '25', '30', '50'],
    isLoading = false,
    maxHeight = 440,
    minHeight = null,
    noBorder,
    infinite = false,
    showPerPage = true,
    sortBy: sortByFromProps,
    fallbackContent = 'No Data Found',
    renderHeader,
    gridHelperPosition = 'top',
    design = 'v1',
    ...rest
  } = props;

  const isAllChecked = useRef<boolean>(false);
  const [sortBy, setSortBy] = useState<TSortState>(
    sortByFromProps || {
      by: columns[0]?.key,
      type: '-',
    },
  );

  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(defaultPageNo ?? 1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPageSize ?? 25);
  const [rows, setRows] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const totalDataSize = pagination?.pagination?.total ?? (data || []).length;

  useEffect(() => {
    setIsFetching(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setRows(data.filter(item => !isEmpty(item)));
  }, [data]);

  useEffect(() => {
    if (pagination?.pagination) {
      setPage(pagination.pagination.pageNo || (defaultPageNo ?? 1));
      setRowsPerPage(pagination.pagination.pageSize || (defaultPageSize ?? 25));
    }
  }, [pagination]);

  useEffect(() => {
    setRows([]);
    if (rest.showCheckbox) {
      setCheckedItems([]);
    }
    let dataRows = data.filter(item => !isEmpty(item));
    if (!onPaginationChange && dataRows.length && !infinite) {
      dataRows = paginateData(dataRows, page, rowsPerPage);
    }
    if (!onPaginationChange && Object.keys(sortBy).length) {
      dataRows = sortRows(dataRows, sortBy);
    }
    setRows(dataRows);
  }, [data, page, rowsPerPage, sortBy]);

  const handleSort = (column: Column) => {
    const sort: TSortState =
      sortBy.by === column.key
        ? {
            ...sortBy,
            type: sortBy.type === '-' ? '+' : '-',
          }
        : {
            by: column.key,
            type: '-',
          };
    onPaginationChange?.({
      pagination: {
        pageNo: 1,
        pageSize: rowsPerPage,
      },
      sort,
    });
    setSortBy(sort);
  };

  const handlePageSizeChange = (newPageSize: string) => {
    const pageSize = parseInt(newPageSize, 10);
    if (typeof onPaginationChange === 'function') {
      onPaginationChange({
        pagination: {
          pageNo: 1,
          pageSize: Number(pageSize),
        },
        // Commented as it was falling for first column to sort data
        // sort: sortBy,
      });
    } else {
      setRowsPerPage(parseInt(newPageSize ?? '', 10));
      setPage(1);
    }
  };

  const onCheckboxClick = (row: any) => {
    if (!row) {
      if (isAllChecked.current) {
        setCheckedItems([]);
      } else {
        setCheckedItems(rows.filter(item => !rest.isCheckboxDisabled?.(item)));
      }
      isAllChecked.current = !isAllChecked.current;
      return;
    }
    isAllChecked.current = false;
    const isChecked = checkedItems.some(item => isEqual(item, row));
    if (isChecked) {
      setCheckedItems(prevItems => prevItems.filter(item => !isEqual(item, row)));
    } else {
      setCheckedItems(prevItems => [...prevItems, row]);
    }
  };

  return (
    <div className={`${styles.container} ${minHeight === 'auto' ? styles.noMinHeight : ''}`} data-testid="data-grid">
      {renderHeader ? renderHeader({ checkedItems, updateCheckedItems: setCheckedItems }) : null}
      {gridHelperPosition === 'top' && (
        <div className={`${styles.header_container} ${noBorder ? styles.noBorder : ''} ${styles.custom_header_styles}`}>
          <div>
            {tableTitle ? (
              <p className={styles.table_title}>
                {tableTitle} <span>{pagination?.pagination.total || data.length}</span>
              </p>
            ) : (
              <span />
            )}
          </div>
          {showPerPage && !infinite ? (
            <div className={styles.per_page_container}>
              <span className={styles.per_page_text}>
                Show : <span>{rowsPerPage}</span>
              </span>
              <MoreMenu
                Icon={ChevronDownIcon}
                options={pageSizeOptions?.map(item => {
                  return {
                    label: `${item}`,
                    onClick: option => handlePageSizeChange(option),
                  };
                })}
              />
            </div>
          ) : (
            <span />
          )}
        </div>
      )}
      <TableContainer>
        <DataTable
          data={rows}
          handleSort={handleSort}
          isLoading={isFetching}
          columns={columns}
          classes={classes}
          sortBy={sortBy}
          maxHeight={maxHeight}
          onCheckboxClick={onCheckboxClick}
          checkedItems={checkedItems}
          noBorder={noBorder}
          design={design}
          {...rest}
        />
        {!isFetching && !rows.length && (
          <div className={styles.no_content_label}>
            <Image src={EmptyListImage} priority alt="Empty List Image" data-testid="no-content-img" />
            {typeof fallbackContent === 'string' ? (
              <div>{fallbackContent}</div>
            ) : (
              <>
                {fallbackContent?.title && <div className={styles.noSelectionHeader}>{fallbackContent?.title}</div>}
                {fallbackContent?.description && (
                  <div className={styles.noSelectionText}>{fallbackContent?.description}</div>
                )}
              </>
            )}
          </div>
        )}
      </TableContainer>
      {!infinite ? (
        <div className={`${styles.header_container} ${noBorder ? styles.noBorder : ''}`}>
          <div>
            {gridHelperPosition === 'bottom' && (
              <div>
                {tableTitle ? (
                  <p className={styles.table_title}>
                    {tableTitle} <span>{pagination?.pagination.total || data.length}</span>
                  </p>
                ) : (
                  <span />
                )}
              </div>
            )}
          </div>
          <div className={`${styles.pagination_container} ${design === 'v2' ? styles.custom_pagination_style : ''}`}>
            {totalDataSize >= rowsPerPage && (
              <Pagination
                sx={{
                  'button:not(.Mui-selected)':
                    design === 'v2'
                      ? {
                          backgroundColor: '#EDF0FC',
                        }
                      : {},
                }}
                count={Math.ceil(totalDataSize / rowsPerPage)}
                variant={design === 'v1' ? 'outlined' : 'text'}
                color={design === 'v1' ? 'standard' : 'primary'}
                shape="rounded"
                page={typeof page === 'string' ? parseInt(page, 10) : page}
                hideNextButton={
                  Math.floor(totalDataSize / rowsPerPage) + 1 === pagination?.pagination?.pageNo ||
                  totalDataSize < rowsPerPage
                }
                hidePrevButton={pagination?.pagination?.pageNo === 1 || totalDataSize < rowsPerPage}
                renderItem={item => <PaginationItem {...item} />}
                onChange={(e, newPage) => {
                  if (newPage != page) {
                    if (typeof onPaginationChange === 'function') {
                      onPaginationChange({
                        pagination: {
                          pageNo: newPage,
                          pageSize: rowsPerPage,
                        },
                      });
                    } else {
                      setPage(newPage);
                    }
                  }
                }}
              />
            )}
          </div>
          <div>
            {!infinite && showPerPage && gridHelperPosition === 'bottom' && (
              <div className={styles.per_page_container}>
                <span className={styles.per_page_text}>
                  Show : <span>{rowsPerPage}</span>
                </span>
                <MoreMenu
                  Icon={ChevronDownIcon}
                  options={pageSizeOptions?.map(item => {
                    return {
                      label: `${item}`,
                      onClick: option => handlePageSizeChange(option),
                    };
                  })}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DataGrid;
