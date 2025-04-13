import React, { useCallback } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { CircularProgress } from '@/lib/material-ui';
import styles from './infinite-list.module.scss';

interface IInfiniteList<T> {
  list: T[];
  isLoading?: boolean;
  className?: string;
  hasNextPage?: boolean;
  itemSize?: number;
  getItemSize?: (item: T, prevItem?: T) => number;
  renderItem: (item: T, prevItem?: T) => React.ReactElement;
  FallbackComponent?: React.ElementType | null;
  handleScroll?: (startIndex: number, stopIndex: number) => Promise<void> | void;
}

const InfiniteList = <Type,>(props: IInfiniteList<Type>) => {
  const {
    className,
    FallbackComponent,
    renderItem,
    hasNextPage,
    isLoading,
    itemSize = 50,
    getItemSize,
    handleScroll = () => {},
    list = [],
  } = props;

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? list.length + 1 : list.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isLoading ? () => {} : handleScroll;

  const isItemLoaded = (index: number) => !hasNextPage || index < list.length;

  // Every row is loaded except for our loading indicator row.
  const Item = useCallback(
    ({ index, style }: any) => {
      let content = null;
      const isLastIndex = !list[index];
      if (isLastIndex) {
        content = isLoading ? (
          <div className={styles.progress_container}>
            <CircularProgress size="18px" />
          </div>
        ) : null;
      } else if (list[index]) {
        const prevItem = list[index - 1];
        content = renderItem(list[index], prevItem);
      }
      return <div style={style}>{content}</div>;
    },
    [list, isLoading, renderItem],
  );

  if (!isLoading && !list.length && FallbackComponent) {
    return (
      <div className={styles.fallback_container}>
        <FallbackComponent />
      </div>
    );
  }

  if (isLoading && !list.length) {
    return (
      <div className={styles.progress_container}>
        <CircularProgress size="18px" />
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {({ height, width }: any) => (
                <List
                  height={height}
                  itemCount={itemCount}
                  className={styles.scrollbar}
                  itemSize={index => (getItemSize ? getItemSize(list[index], list[index - 1]) : itemSize)}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                >
                  {Item}
                </List>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
      {isLoading && (
        <div className={styles.progress_container}>
          <CircularProgress size="18px" />
        </div>
      )}
    </>
  );
};

export default InfiniteList;
