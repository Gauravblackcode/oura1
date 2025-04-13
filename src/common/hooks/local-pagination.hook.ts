import { useMemo, useState } from 'react';

interface IUsePagination<T> {
  data: Array<T>;
  pageNo?: number;
  pageSize?: number;
}

const usePagination = <T>(config: IUsePagination<T>) => {
  const { data = [], pageNo = 1, pageSize = 5 } = config;

  const [pagination, setPagination] = useState<Record<'pageNo' | 'pageSize', number>>({
    pageNo,
    pageSize,
  });

  const paginatedData = useMemo(() => {
    const start = (pagination.pageNo - 1) * pageSize;
    const end = start + pageSize;
    const newData = data.slice(start, end);
    if (newData?.length) {
      return newData;
    } else if (pagination.pageNo > 1) {
      setPagination(prev => ({ ...prev, pageNo: prev.pageNo - 1 }));
      return [];
    }
    return [];
  }, [data, pagination]);

  const totalPages = useMemo(() => Math.ceil(data.length / pageSize), [data, pageSize]);

  const handlePageChange = (page: number, size: number) => {
    setPagination({
      pageNo: page,
      pageSize: size,
    });
  };

  return {
    data: paginatedData,
    totalPages,
    pagination: {
      ...pagination,
      totalCount: data.length,
    },
    handlePageChange,
  };
};

export default usePagination;
