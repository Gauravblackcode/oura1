import { useState } from 'react';
import useSWR from 'swr';
import TasksService from '@/services/tasks/tasks.service';
import { Task, TaskResponse } from 'types';

const tasksService = new TasksService();

interface FetcherParams {
  filters: Record<string, unknown>;
  sort: { field: string; order: 'ASC' | 'DESC' };
  pagination: { pageSize: number; pageNo: number };
}

const fetcher = async ([_, params]: [string, FetcherParams]) => {
  const { filters, sort, pagination } = params;
  const response = await tasksService.getTasks(filters, sort, pagination);
  return response;
};

const TasksContainer = () => {
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [sort, setSort] = useState({ field: 'createdAt', order: 'DESC' as const });
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNo: 1
  });

  const { data, error, isLoading, mutate } = useSWR<TaskResponse>(
    ['tasks', { filters, sort, pagination }],
    fetcher
  );

  console.log(data);
  
  const handlePageChange = (pageNo: number) => {
    setPagination(prev => ({ ...prev, pageNo }));
  };

  const handleSortChange = (field: string) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'ASC' ? 'DESC' : 'ASC'
    }));
  };

  const handleFilterChange = (newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageNo: 1 }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Failed to load tasks</div>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="p-6">
        <div>No tasks found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-normal">Tasks</h1>
        {/* Add filter controls here */}
      </div>

      <div className="space-y-4">
        {data.data.map((task: Task) => (
          <div key={task._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-medium">{task.title}</h2>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              <span className="mr-4">Status: {task.status}</span>
              {task.dueDate && (
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {data.totalRecords > pagination.pageSize && (
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(data.totalRecords / pagination.pageSize) }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  pagination.pageNo === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksContainer;


