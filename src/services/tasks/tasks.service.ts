import GRAPHQL_CLIENT from '../network/graphql.service';
import { Task, CreateTaskDto, UpdateTaskDto, TaskResponse, TaskDocument, CreateTaskDocument, UpdateTaskDocument, DeleteTaskDocument, TasksDocument, TaskCountDocument, FiltersDto, SortDto, PaginationDto } from 'types';

export default class TasksService {
  constructor() {
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await GRAPHQL_CLIENT.query<{ task: Task }>({
      query: TaskDocument,
      variables: { id }
    });

    return response.data.task;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const response = await GRAPHQL_CLIENT.mutate({
      mutation: CreateTaskDocument,
      variables: { createTaskDto }
    });

    return response.data;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const response = await GRAPHQL_CLIENT.mutate({
      mutation: UpdateTaskDocument,
      variables: { id, updateTaskDto }
    });

    return response.data;
  }

  async deleteTask(id: string) {
    const response = await GRAPHQL_CLIENT.mutate({
      mutation: DeleteTaskDocument,
      variables: { id }
    });

    return response.data;
  }

  async getTasks(filters?: FiltersDto, sort?: SortDto, pagination?: PaginationDto): Promise<TaskResponse> {
    const response = await GRAPHQL_CLIENT.query<{ tasks: TaskResponse }>({
      query: TasksDocument,
      variables: { filters, sort, pagination }
    });

    return response.data.tasks;
  }

  async getTaskCount(filters?: any): Promise<number> {
    const response = await GRAPHQL_CLIENT.query<{ taskCount: number }>({
      query: TaskCountDocument,
      variables: { filters }
    });

    return response.data.taskCount;
  }
} 