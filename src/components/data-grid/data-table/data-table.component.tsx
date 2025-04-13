import { isEqual } from 'lodash';
import {
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from '@/lib/material-ui';
import { DataTableProps } from '../types';
import { getProps, extract, getRowId, getPinnedPosition } from '../utilities/table-utilities';
import SortIcon from '../sort-icon/sort-icon.component';
import styles from './data-table.module.scss';

const DataTable = (props: DataTableProps) => {
  const {
    sortBy,
    classes,
    columns = [],
    data = [],
    idKey = '',
    dense = false,
    handleSort,
    onRowClick,
    isLoading,
    showCheckbox = false,
    checkedItems = [],
    onCheckboxClick = () => {},
    noBorder,
    design,
    isCheckboxDisabled = () => false,
  } = props;

  const isMobile = useMediaQuery(`(min-width: 320px) and (max-width: 767px)`);

  const { root, theadRow, tBodyRow, th, td } = classes;
  const emptyDataRow = new Array(5).fill('');
  return (
    <Table
      className={root}
      size={dense ? 'small' : 'medium'}
      classes={{
        root: styles.table,
      }}
      stickyHeader
    >
      <TableHead>
        <TableRow className={`${theadRow} ${styles.tr}`}>
          {showCheckbox && (
            <TableCell
              key="th_checkbox"
              style={{ minWidth: 75, position: 'sticky', left: '0px', backgroundColor: 'white', zIndex: 100 }}
              align="left"
              onClick={() => onCheckboxClick()}
            >
              <Checkbox
                className={styles.checkbox}
                sx={{
                  padding: 0,
                }}
                disabled={data.length === 0}
                indeterminate={checkedItems.length > 0 && checkedItems.length !== data.length}
                checked={checkedItems.length > 0 && checkedItems.length === data.length}
              />
            </TableCell>
          )}
          {columns.map((col, i) => {
            const { key, label = '--', sort: sortable, hidden, minWidth = 100, ...rest } = col;

            if (hidden) {
              return null;
            }
            const style: any = {
              // position: '',
              minWidth: '100px',
            };

            style.minWidth = `${minWidth}px`;

            if (rest.pinned && !isMobile) {
              const position = col.align !== 'right' ? getPinnedPosition(columns.slice(0, i), { showCheckbox }) : 0;
              style[col.align ?? 'right'] = `${position}px`;
              style.position = 'sticky';
              style.backgroundColor = 'white';
              style.zIndex = '100';
            }

            if (sortable && label) {
              return (
                <TableCell
                  {...getProps(rest, `${styles.th} ${th} ${styles.column}`)}
                  key={`th_${key}`}
                  style={style}
                  align={col.align ?? 'left'}
                  onClick={() => handleSort(col)}
                >
                  <TableSortLabel
                    classes={{
                      root: styles.sortLabel,
                      active: styles.sortActive,
                      iconDirectionAsc: styles.sortAsc,
                      iconDirectionDesc: styles.sortDesc,
                    }}
                    active={sortBy.by === col.key}
                    direction={sortBy && ['-1', 'desc', '+'].includes(sortBy.type) ? 'desc' : 'asc'}
                    IconComponent={SortIcon}
                  >
                    <span className={styles.cellContainer}>{label ?? '--'}</span>
                  </TableSortLabel>
                </TableCell>
              );
            }
            return (
              <TableCell
                {...getProps(rest, `${styles.th} ${th} ${styles.column}`)}
                key={`th_${key}`}
                align={col.align ?? 'left'}
                style={style}
              >
                <span className={styles.cellContainer}>{label ?? '--'}</span>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading && (
          <>
            {emptyDataRow.map((_, index) => (
              <TableRow key={`${_}.${index}`}>
                {columns.map(col =>
                  col.hidden ? null : (
                    <TableCell
                      {...getProps(col, `${styles.td} ${td} ${styles.column}`)}
                      key={`th_${col.key}`}
                      align={col.align ?? 'left'}
                      style={
                        col.pinned && !isMobile
                          ? {
                              position: 'sticky',
                              [col.align ?? 'right']: '0px',
                              backgroundColor: 'white',
                            }
                          : {}
                      }
                    >
                      <div className={styles.cellContainer}>
                        <Skeleton />
                      </div>
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </>
        )}
        {!isLoading &&
          data.map((row, i) => {
            const rows = [];
            rows.push(
              <TableRow
                sx={
                  design === 'v1'
                    ? {
                        height: 75,
                      }
                    : {}
                }
                key={`TableRow_${getRowId(row, idKey)}`}
                data-testid={`TableRow-${i}`}
                className={`${styles.tr} ${tBodyRow}`}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{
                  cursor: onRowClick ? 'pointer' : 'auto',
                }}
              >
                {showCheckbox && (
                  <TableCell
                    key={`th_${getRowId(row, idKey)}`}
                    data-testid={`checkbox-${i}`}
                    style={{ zIndex: 1199, minWidth: 70, position: 'sticky', left: '0px', backgroundColor: 'white' }}
                    align="left"
                    onClick={() => (!isCheckboxDisabled(row) ? onCheckboxClick(row) : {})}
                  >
                    <Checkbox
                      className={styles.checkbox}
                      sx={{
                        padding: 0,
                      }}
                      disabled={isCheckboxDisabled(row)}
                      checked={checkedItems.some(items => isEqual(items, row))}
                    />
                  </TableCell>
                )}
                {columns.map((col, j) =>
                  col.hidden ? null : (
                    <TableCell
                      data-testid={`${col.key}`}
                      {...getProps(col, `${styles.td} ${td} ${styles.column} ${noBorder ? styles.noBorder : ''}`)}
                      key={`${getRowId(row, idKey)}_${col.key}`}
                      align={col.align ?? 'left'}
                      style={
                        col.pinned && !isMobile
                          ? {
                              position: 'sticky',
                              [col.align ?? 'right']:
                                col.align === 'right'
                                  ? '0px'
                                  : `${getPinnedPosition(columns.slice(0, j), { showCheckbox })}px`,
                              backgroundColor: 'white',
                            }
                          : {}
                      }
                    >
                      <div className={styles.cellContainer} data-center={col.align === 'center'}>
                        {extract(row, i, col, j)}
                      </div>
                    </TableCell>
                  ),
                )}
              </TableRow>,
            );
            return rows;
          })}
      </TableBody>
    </Table>
  );
};

export default DataTable;
