export enum TaskPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export enum TaskStatus {
  Todo = 'TODO',
  InProgress = 'IN_PROGRESS',
  Done = 'DONE',
  Cancelled = 'CANCELLED',
}

export interface Task {
  _id: string;
  createdAt: string;

  description?: string;
  dueDate?: string;
  goalId?: string;
  isGeneratedByAime?: boolean;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
  userId: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
  goalId?: string;
  isGeneratedByAime?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  goalId?: string;
  isGeneratedByAime?: boolean;
}

export interface TaskFiltersDto {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  goalId?: string;
  isGeneratedByAime?: boolean;
  userId?: string;
}

export interface TaskSortDto {
  field: 'createdAt' | 'dueDate' | 'priority' | 'status' | 'title';
  order: 'ASC' | 'DESC';
}

export interface TaskPaginationDto {
  pageNo: number;
  pageSize: number;
}

export interface TaskResponse {
  pageNo: number;
  pageSize: number;
  totalRecords: number;
  data: Task[];
}
