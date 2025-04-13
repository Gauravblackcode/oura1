import unionBy from 'lodash/unionBy';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { UserAdvancedFilters, UsersNameListQueryVariables } from 'types';
import { PriorityFilters, PriorityFiltersProps } from '@/lib/dsl/dsl';
import { SelectList } from '@/types/common';
import UsersService from '@/services/users/users.service';

interface IUsersDropdown<Type> {
  filters?: UserAdvancedFilters;
  baseList?: Array<Record<'label' | 'value', Type>>;
  dropdownOptions: Omit<
    PriorityFiltersProps<Type, 'single'>,
    'placeholder' | 'options' | 'loading' | 'onSearch' | 'onFocus' | 'onBlur' | 'onScroll'
  >;
}

const UsersDropdown = <Type,>(props: IUsersDropdown<Type>) => {
  const { dropdownOptions, filters = {}, baseList = [] } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const usersService = useMemo(() => new UsersService(), []);

  const [usersList, setUsersList] = useState<Array<SelectList>>(baseList);

  const [usersFilters, setUsersFilters] = useState<UsersNameListQueryVariables>({
    page: 1,
    pageSize: 10,
    sort: '+name',
    filters: {
      active: true,
    },
  });

  const { data, isLoading, isValidating } = useSWR(
    { key: 'users-list', filters: usersFilters, extraFilters: filters, isFocused },
    payload =>
      payload.isFocused
        ? usersService.getUsersNameList(
            {
              ...payload.filters,
              filters: {
                ...payload.filters.filters,
                ...payload.extraFilters,
              },
            },
            {
              silent: true,
            },
          )
        : undefined,
    {
      onSuccess: response => {
        const formattedList =
          response?.usersAdvanced?.content.map(item => ({
            label: item?.name as string,
            value: item?.id as string,
          })) ?? [];
        setUsersList(prev => unionBy(prev, formattedList, 'value'));
      },
    },
  );

  const handleSearch = (search?: string) => {
    setUsersList(search ? [] : baseList);
    setUsersFilters(prev => ({
      ...prev,
      page: 1,
      filters: {
        ...prev.filters,
        search,
      },
    }));
  };

  const handleScroll = () => {
    if (Number(data?.usersAdvanced.totalCount) > usersList.length) {
      setUsersFilters(prev => ({
        ...prev,
        page: Number(prev.page) + 1,
      }));
    }
  };

  return (
    <PriorityFilters
      loading={isLoading || isValidating}
      placeholder="Users"
      fallback="All Users"
      options={usersList}
      onSearch={handleSearch}
      onScroll={handleScroll}
      onFocus={() => setIsFocused(true)}
      {...dropdownOptions}
    />
  );
};

export default UsersDropdown;
