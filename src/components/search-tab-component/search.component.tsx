import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import unionBy from 'lodash/unionBy';
import isEqual from 'lodash/isEqual';
import { Button, SearchInput, Typography } from 'shyftlabs-dsl';
import { EntityType, Maybe, PlatformSearchResult, PlatformSearchResultByTextQueryVariables } from 'types';
import useSWR from 'swr';
import SearchService from '@/services/search/search.service';
import StorageService from '@/services/storage/storage.service';
import useUser from '@/contexts/user-data/user-data.hook';
import ROUTES from '@/common/routes';
import { CircularProgress } from '@/lib/material-ui';
import { CloseIcon } from '@/lib/icons';
import { toTitleCase } from '@/common/helpers';
import LabelToolTip from '../tooltip/label-tooltip/label-tooltip.component';
import styles from './search.tab.module.scss';

const DEFAULT_RECENT_SEARCH = '[]';

interface ISearchResults {
  loading: boolean;
  totalCount?: number;
  searchResults?: Array<Maybe<PlatformSearchResult>>;
  fetchMoreResults: () => void;
  handleSearchItemClick: (item: any) => void;
}

interface IRecentSearchResults {
  searchResults: Array<Partial<PlatformSearchResult>>;
  handleSearchItemClick: (item: any) => void;
  handleRemoveSearchFromList: (item: any) => void;
}

const SearchResults = ({
  loading,
  searchResults,
  handleSearchItemClick,
  totalCount,
  fetchMoreResults,
}: ISearchResults) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  if (!searchResults?.length && !loading) {
    return (
      <Typography textAlign="center" verticalPadding="12px" variant="body-large-medium">
        No Results Found
      </Typography>
    );
  }

  const handleScroll = () => {
    const container = listRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight === scrollHeight) {
        if (Number(totalCount) > Number(searchResults?.length)) {
          fetchMoreResults();
        }
      }
    }
  };

  return (
    <div className={styles.scrollableResults}>
      <h3>{`Results Found: ${totalCount || '...'}`}</h3>
      <div className={styles.scroll_wrapper} ref={listRef} onScroll={handleScroll}>
        {searchResults?.map((searchData, index) => (
          <div key={index} className={styles.resultContent} onClick={() => handleSearchItemClick(searchData)}>
            <LabelToolTip label={searchData?.name ?? ''} trimLength={80} labelClassName={styles.result_label} />
            <Typography>{searchData?.entityName}</Typography>
          </div>
        ))}
      </div>
      {loading && (
        <div className={styles.loader_container}>
          <CircularProgress size={20} />
        </div>
      )}
    </div>
  );
};

const RecentSearchResults = ({
  searchResults,
  handleSearchItemClick,
  handleRemoveSearchFromList,
}: IRecentSearchResults) => {
  return (
    <div className={styles.scrollableResults}>
      <h3>{`Recently Searched: ${searchResults.length}`}</h3>
      {searchResults.map((searchData, index) => (
        <div key={index} className={styles.savedResultContent}>
          <div onClick={() => handleSearchItemClick(searchData)} className={styles.result_label}>
            <LabelToolTip label={searchData.name ?? ''} trimLength={80} />
          </div>
          <Typography>{searchData.entityName}</Typography>
          <Button
            size="small"
            variant="text-only"
            icon={<CloseIcon size={16} />}
            onClick={() => handleRemoveSearchFromList(searchData)}
          />
        </div>
      ))}
    </div>
  );
};

const SearchComponent = ({ closePopup }: { closePopup: any }) => {
  const { permission, isPublisher, isAdvertiser } = useUser();
  const router = useRouter();
  const searchService = useMemo(() => new SearchService(), []);
  const storageService = useMemo(() => new StorageService(), []);
  const totalCount = useRef<number>();

  const searchEntities = useMemo(() => {
    const options: Array<EntityType | 'all'> = [];
    options.push('all');
    if (
      (isPublisher && !permission?.ALL_PUBLISHER_CAMPAIGNS.noAccess) ||
      (isAdvertiser && !permission?.ALL_ADVERTISER_CAMPAIGNS.noAccess)
    ) {
      options.push(EntityType.Campaign, EntityType.AdItem, EntityType.Creative);
    }
    if (!permission?.AD_INVENTORY_PLACEMENTS.noAccess) {
      options.push(EntityType.AdUnit, EntityType.Placement);
    }
    return options;
  }, [permission, isPublisher, isAdvertiser]);

  const [searchQueryFilters, setSearchQueryFilters] = useState<PlatformSearchResultByTextQueryVariables>({
    page: 1,
    pageSize: 20,
    text: '',
    filters: {},
  });

  const [searchResults, setSearchResults] = useState<PlatformSearchResult[]>([]);

  const [recentlySearchItems, setRecentlySearchItems] = useState<PlatformSearchResult[]>([]);

  const getRecentlySearchItems = () => {
    const result: PlatformSearchResult[] = JSON.parse(storageService.getStorage('SEARCH_ITEMS', DEFAULT_RECENT_SEARCH));
    setRecentlySearchItems(result);
  };

  useEffect(() => {
    getRecentlySearchItems();
  }, []);

  const { isLoading } = useSWR(
    { key: 'global-search', searchQueryFilters },
    payload => {
      if (payload.searchQueryFilters.text) {
        const baseFilters = { ...payload.searchQueryFilters };
        return searchService.getSearchResults(baseFilters, { silent: true });
      }
      return undefined;
    },
    {
      onSuccess: response => {
        const baseList = (response?.platformSearchResultByText.content as PlatformSearchResult[]) ?? [];
        totalCount.current = Number(response?.platformSearchResultByText.totalCount);
        if (searchQueryFilters.page === 1) {
          setSearchResults(baseList);
        } else {
          setSearchResults(prev => unionBy(prev, baseList, 'fieldId'));
        }
      },
    },
  );

  const handleSearchItemClick = (result: PlatformSearchResult) => {
    closePopup();
    const isAlreadyAdded = recentlySearchItems.some(item => isEqual(result, item));
    if (!isAlreadyAdded) {
      storageService.setStorage('SEARCH_ITEMS', JSON.stringify([result, ...recentlySearchItems].slice(0, 5)));
      getRecentlySearchItems();
    }
    const hasInventoryEditAccess = permission?.AD_INVENTORY_PLACEMENTS.fullAccess;
    switch (result.entityName) {
      case toTitleCase(EntityType.Campaign):
        router.push(`${ROUTES.CAMPAIGN.BASE}/${result.fieldId}`);
        return;
      case toTitleCase(EntityType.AdItem):
        router.push(`${ROUTES.AD_ITEM.BASE}/${result.fieldId}`);
        return;
      case toTitleCase(EntityType.Creative):
        router.push({
          pathname: ROUTES.CREATIVE.BASE,
          query: {
            search: result.fieldId,
          },
        });
        return;
      case toTitleCase(EntityType.AdUnit):
        if (hasInventoryEditAccess) {
          router.push(`${ROUTES.INVENTORY.EDIT_AD_UNIT}/${result.fieldId}`);
        } else {
          router.push({
            pathname: ROUTES.INVENTORY.BASE,
            query: {
              name: result.name,
            },
          });
        }
        return;
      case toTitleCase(EntityType.Placement):
        if (hasInventoryEditAccess) {
          router.push(`${ROUTES.INVENTORY.EDIT_PLACEMENT}/${result.fieldId}`);
        } else {
          router.push({
            pathname: ROUTES.INVENTORY.BASE,
            query: {
              tab: 'placements',
              name: result.name,
            },
          });
        }
        return;
    }
  };

  const handleRemoveSearchFromList = (result: PlatformSearchResult) => {
    const updatedList = recentlySearchItems.filter(item => !isEqual(result, item));
    storageService.setStorage('SEARCH_ITEMS', JSON.stringify(updatedList));
    getRecentlySearchItems();
  };

  const fetchMoreResults = () => {
    setSearchQueryFilters(prev => ({
      ...prev,
      page: Number(prev.page) + 1,
    }));
  };

  const hasRecentSearched = recentlySearchItems.length > 0 && !searchQueryFilters.text;

  return (
    <div className={styles.container} data-testid="app-search-container">
      <div className={styles.searchContainer}>
        <SearchInput
          placeholder="Search"
          debounceTime={1000}
          width="100%"
          initialValue={searchQueryFilters.text}
          autoFocus
          onSearch={text =>
            setSearchQueryFilters(prev => ({
              ...prev,
              page: 1,
              text,
            }))
          }
          data-testid="app-search-input"
        />
        <Button
          variant="text-only"
          size="medium"
          label="Clear"
          onClick={() =>
            setSearchQueryFilters(prev => ({
              ...prev,
              page: 1,
              text: '',
            }))
          }
        />
      </div>
      <div className={styles.contentContainer}>
        <Typography variant="body-semibold">Search By</Typography>
        <div className={styles.optionContent}>
          {searchEntities.map(entity => (
            <div
              key={entity}
              data-active={(searchQueryFilters.filters?.entity ?? 'all') === entity}
              className={styles.roundedContainer}
              onClick={() =>
                setSearchQueryFilters(prev => ({
                  ...prev,
                  page: 1,
                  filters: {
                    ...prev.filters,
                    entity: entity !== 'all' ? entity : undefined,
                  },
                }))
              }
            >
              <span className={styles.selectedOption}>{toTitleCase(entity)}</span>
            </div>
          ))}
        </div>

        <div className={styles.results}>
          {!!searchQueryFilters.text && (
            <SearchResults
              loading={isLoading}
              searchResults={searchResults}
              totalCount={totalCount.current}
              handleSearchItemClick={handleSearchItemClick}
              fetchMoreResults={fetchMoreResults}
            />
          )}
          {hasRecentSearched && (
            <RecentSearchResults
              searchResults={recentlySearchItems}
              handleSearchItemClick={handleSearchItemClick}
              handleRemoveSearchFromList={handleRemoveSearchFromList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
