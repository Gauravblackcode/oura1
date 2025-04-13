import unionBy from 'lodash/unionBy';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { AdvertisersQueryVariables } from 'types';
import { PriorityFilters, PriorityFiltersProps } from '@/lib/dsl/dsl';
import { SelectList } from '@/types/common';
import AdvertiserService from '@/services/advertisers/advertisers.service';

type IAdvertiserDropdown<Type> = Omit<
  PriorityFiltersProps<Type, 'multiple'>,
  'placeholder' | 'options' | 'loading' | 'onSearch' | 'onFocus' | 'onBlur' | 'onScroll'
>;

const AdvertiserDropdown = <Type,>(props: IAdvertiserDropdown<Type>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const advertiserService = useMemo(() => new AdvertiserService(), []);

  const [advertiserList, setAdvertiserList] = useState<Array<SelectList>>([]);

  const [advertiserFilters, setAdvertiserFilters] = useState<AdvertisersQueryVariables>({
    page: 1,
  });

  const { data, isLoading, isValidating } = useSWR(
    { key: 'advertiserList', filters: advertiserFilters, isFocused },
    payload =>
      payload.isFocused
        ? advertiserService.getAdvertisersList(
            {
              ...payload.filters,
              pageSize: 10,
              sort: '+name',
            },
            {
              silent: true,
            },
          )
        : undefined,
    {
      onSuccess: response => {
        const formattedList =
          response?.advertisers?.content.map(item => ({
            label: item?.name as string,
            value: item?.id as string,
          })) ?? [];
        setAdvertiserList(prev =>
          advertiserFilters.page === 1 ? formattedList : unionBy(prev, formattedList, 'value'),
        );
      },
    },
  );

  const handleSearch = (name?: string) => {
    setAdvertiserFilters(prev => ({
      ...prev,
      page: 1,
      filters: {
        ...prev.filters,
        name,
      },
    }));
  };

  const handleScroll = () => {
    if (Number(data?.advertisers.totalCount) > advertiserList.length) {
      setAdvertiserFilters(prev => ({
        ...prev,
        page: Number(prev.page) + 1,
      }));
    }
  };

  return (
    <PriorityFilters
      loading={isLoading || isValidating}
      placeholder="Advertisers"
      fallback="All Advertisers"
      options={advertiserList}
      onSearch={handleSearch}
      onScroll={handleScroll}
      onFocus={() => setIsFocused(true)}
      {...props}
    />
  );
};

export default AdvertiserDropdown;
