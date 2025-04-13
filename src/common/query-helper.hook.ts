import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
// import { SelectOption } from '@/types/common';

type TUpdateQueryParamsConfigs = Partial<{
  resetPage: boolean;
}>;

const defaultUpdateConfigs: TUpdateQueryParamsConfigs = {
  resetPage: true,
};

type ValueType<T> = {
  label: string;
  value: T;
};

type TQueryOptions = {
  key: string;
  defaultValue?: string | number;
};

type QueryResult<T extends ReadonlyArray<TQueryOptions>> = {
  [K in T[number]['key']]: T[number] extends { key: K; defaultValue: infer D } ? D : string | undefined;
};

export const useQueryHelper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams: { [key: string]: string } = useMemo(() => {
    return Array.from(searchParams.entries()).reduce(
      (acc: { [key: string]: string }, curr: [string, string]) => ({
        ...acc,
        [curr[0]]: curr[1],
      }),
      {} as { [key: string]: string },
    );
  }, [searchParams]);

  const getQueriesForAPI = <T extends ReadonlyArray<TQueryOptions>>(options: T): QueryResult<T> => {
    return options.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.key]: queryParams[curr.key] || curr.defaultValue,
      }),
      {} as QueryResult<T>,
    );
  };

  const getRegularQuery = (key: string) => queryParams[key];

  const updateRegularQuery = (
    fieldsToUpdate: { [key: string]: string | number },
    configs: TUpdateQueryParamsConfigs = defaultUpdateConfigs,
  ) => {
    const updatedConfigs = { ...defaultUpdateConfigs, ...configs };
    const basePath = router.asPath.split('?')[0];
    router.replace({
      pathname: basePath,
      query: {
        ...queryParams,
        ...fieldsToUpdate,
        ...(updatedConfigs.resetPage && { pageNo: 1 }),
      },
    });
  };

  const getFilterQuery = (
    key: string,
    mode: 'single' | 'multiple' = 'single',
  ): ValueType<string> | ValueType<string>[] | undefined => {
    const label: string = queryParams[`${key}Name`];
    const value: string = queryParams[`${key}Id`];
    if (label && value) {
      if ((label.includes(',') && value.includes(',')) || mode === 'multiple') {
        const labelArr = label.split(',');
        const valueArr = value.split(',');
        const finalArr: ValueType<string>[] = [];
        labelArr.forEach((label, index) => {
          finalArr.push({
            label,
            value: valueArr[index],
          });
        });
        return finalArr;
      }
      return {
        label,
        value,
      };
    }
    return undefined;
  };

  interface SelectOption<T> {
    label: string;
    value: T;
  }

  interface UpdateQueryParamsConfigs {
    resetPage: boolean;
  }

  type QueryParams = Record<string, string | number | undefined>;

  const updateFilterQuery = (
    key: string,
    value: SelectOption<string> | SelectOption<string>[],
    queryStyle: 'long' | 'short' = 'long',
    configs: Partial<UpdateQueryParamsConfigs> = {},
  ): void => {
    const mergedConfigs = { resetPage: true, ...configs };
    const basePath = router.asPath.split('?')[0];
    const baseQuery = {
      ...queryParams,
      ...(mergedConfigs.resetPage ? { pageNo: 1 } : {}),
    } as QueryParams;

    if (queryStyle === 'short') {
      const shortValue = Array.isArray(value) ? value[0]?.value : value?.value;

      router.replace({
        pathname: basePath,
        query: {
          ...baseQuery,
          [key]: shortValue,
        } as QueryParams,
      });
      return;
    }

    // Handle long query style
    const values = Array.isArray(value) ? value : [value].filter(Boolean);

    if (!values.length) {
      const query = { ...baseQuery };
      delete query[`${key}Name`];
      delete query[`${key}Id`];
      router.replace({
        pathname: basePath,
        query,
      });
      return;
    }

    const labels = values.map(v => v.label).join(',');
    const ids = values.map(v => v.value).join(',');

    router.replace({
      pathname: basePath,
      query: {
        ...baseQuery,
        [`${key}Name`]: labels,
        [`${key}Id`]: ids,
      } as QueryParams,
    });
  };

  return {
    queryParams,
    getQueriesForAPI,
    getFilterQuery,
    getRegularQuery,
    updateRegularQuery,
    updateFilterQuery,
  };
};
