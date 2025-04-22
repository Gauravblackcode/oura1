import { useState } from 'react';
import useSWR from 'swr';
import TasksService from '@/services/tasks/tasks.service';
import { Task, TaskResponse, TaskStatus, TaskPriority, Frequency } from 'types';
import Header from '@/components/header/Header';
import moment from 'moment';
import TodoIcon from '@/assets/images/todo.svg';
import InProgressIcon from '@/assets/images/inProgress.svg';
import CompletedIcon from '@/assets/images/completed.svg';
import { formatDate } from '@/utils/dateFormat';
import optionsIcon from '@/assets/images/Vector (2).svg';
import styles from './tasks.module.scss';
import Image from 'next/image';

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
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(TaskStatus.Todo);
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>(TaskPriority.Medium);
  const [newTaskRecurrence, setNewTaskRecurrence] = useState<Frequency>(Frequency.Once);
  const [isCreating, setIsCreating] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<TaskResponse>(
    ['tasks', { filters, sort, pagination }],
    fetcher
  );

  const handlePageChange = (pageNo: number) => {
    setPagination(prev => ({ ...prev, pageNo }));
  };


  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);

    let newFilters: Record<string, unknown> = {};

    if (filter === 'todo') {
      newFilters = { status: 'TODO' };
    } else if (filter === 'inProgress') {
      newFilters = { status: 'IN_PROGRESS' };
    } else if (filter === 'completed') {
      newFilters = { status: 'DONE' };
    }

    setFilters(newFilters);
    setPagination(prev => ({ ...prev, pageNo: 1 }));
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;

    setIsCreating(true);
    try {
      const taskData = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
        dueDate: newTaskDueDate ? moment(newTaskDueDate).toISOString() : moment().add(1, 'day').toISOString(),
        priority: newTaskPriority,
        isGeneratedByAime: false,
        isRecurring: newTaskRecurrence !== Frequency.Once,
        recurrenceDetails: newTaskRecurrence !== Frequency.Once ? {
          frequency: newTaskRecurrence,
          interval: 1,
          hour: 0,
          minute: 0
        } : undefined
      };

      console.log('Submitting task data:', taskData);

      const response = await tasksService.createTask(taskData);
      console.log('Response from create task:', response);

      if (response) {
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskDueDate('');
        setNewTaskStatus(TaskStatus.Todo);
        setNewTaskPriority(TaskPriority.Medium);
        setNewTaskRecurrence(Frequency.Once);
        setShowNewTaskForm(false);
        mutate();
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      alert(`Error creating task: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCreating(false);
    }
  };

  // Count tasks by status
  const todoCount = data?.data?.filter(task => task.status === 'TODO').length || 0;
  const inProgressCount = data?.data?.filter(task => task.status === 'IN_PROGRESS').length || 0;
  const completedCount = data?.data?.filter(task => task.status === 'DONE').length || 0;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingPulse}></div>
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
      <main>
        <Header
          title="Tasks"
          breadcrumbs={[
            { label: "Home", path: "/home" },
            { label: "Tasks", path: "/tasks" },
          ]}
        />
        <div className={styles.tasksContainer}>
          <div className="p-6">No tasks found</div>
          <div className={styles.newTaskButtonContainer}>
            <button
              className={styles.newTaskButton}
              onClick={() => setShowNewTaskForm(true)}
            >
              <span className={styles.plusIcon}>+</span>
              <span>New Task</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header
        title="Tasks"
        breadcrumbs={[
          { label: "Home", path: "/home" },
          { label: "Tasks", path: "/tasks" },
        ]}
      />

      <div className={styles.tasksContainer}>
        {/* Filter tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${activeFilter === 'all' ? styles.activeFilter : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Tasks
          </button>
          <button
            className={`${styles.filterTab} ${activeFilter === 'todo' ? styles.activeFilter : ''}`}
            onClick={() => handleFilterChange('todo')}
          >
            To do
          </button>
          <button
            className={`${styles.filterTab} ${activeFilter === 'inProgress' ? styles.activeFilter : ''}`}
            onClick={() => handleFilterChange('inProgress')}
          >
            In Progress
          </button>
          <button
            className={`${styles.filterTab} ${activeFilter === 'completed' ? styles.activeFilter : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>

        {/* Status Cards */}
        <div className={styles.statusTabs}>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} style={{ backgroundColor: '#EEF4FF' }}>
              <Image src={TodoIcon} alt="To do" width={20} height={20} />
            </div>
            <div className={styles.statusTextContainer}>
              <div className={styles.statusCount}>{todoCount.toString().padStart(2, '0')}</div>
              <div className={styles.statusLabel}>To do</div>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} style={{ backgroundColor: '#FEF2F2' }}>
              <Image src={InProgressIcon} alt="In Progress" width={20} height={20} />
            </div>
            <div className={styles.statusTextContainer}>
              <div className={styles.statusCount}>{inProgressCount.toString().padStart(2, '0')}</div>
              <div className={styles.statusLabel}>In Progress</div>
            </div>
          </div>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} style={{ backgroundColor: '#DCFCE7' }}>
              <Image src={CompletedIcon} alt="Completed" width={20} height={20} />
            </div>
            <div className={styles.statusTextContainer}>
              <div className={styles.statusCount}>{completedCount.toString().padStart(2, '0')}</div>
              <div className={styles.statusLabel}>Completed</div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className={styles.tasksListContainer}>
          {data.data.map((task: Task) => (
            <div key={task._id} className={styles.taskCard}>
              <h2 className={styles.taskTitle}>{task.title}</h2>
              <p className={styles.taskDescription}>{task.description}</p>
              <div className={styles.taskMeta}>
                <span className={styles.taskStatus}>Status: {task.status}</span>
                {task.dueDate && (
                  <span className={styles.taskDueDate}>Due: {formatDate(task.dueDate)}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {data.totalRecords > pagination.pageSize && (
          <div className={styles.paginationContainer}>
            <div className={styles.pagination}>
              {Array.from({ length: Math.ceil(data.totalRecords / pagination.pageSize) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`${styles.pageButton} ${pagination.pageNo === i + 1 ? styles.activePage : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* New Task Button */}
        <div className={styles.newTaskButtonContainer}>
          <button
            className={styles.newTaskButton}
            onClick={() => setShowNewTaskForm(true)}
          >
            <span className={styles.plusIcon}>+</span>
            <span>New Task</span>
          </button>
        </div>

        {/* New Task Form */}
        {showNewTaskForm && (
          <div className={styles.newTaskFormContainer}>
            <div className={styles.newTaskForm}>
              <div className={styles.formHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => setShowNewTaskForm(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                  </svg>
                </button>
                <h1 className={styles.formTitle}>Tasks</h1>
              </div>

              <div className={styles.breadcrumbs}>
                <span>Home</span> / <span>Tasks</span> / <span>Task Detail</span>
              </div>

              <div className={styles.formSection}>
                <label className={styles.formLabel}>Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Review designs with client"
                  className={styles.formInput}
                />
                <div className={styles.formDivider}></div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="user interface (UI) is anything a user may interact with to use a digital product or service. This includes everything from screens and touchscreens, keyboard..."
                  className={styles.formTextarea}
                  rows={3}
                />
                <div className={styles.formDivider}></div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.formLabel}>Due Date</label>
                <div className={styles.dateInputContainer}>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className={`${styles.formInput} ${styles.dateInput}`}
                  />
                  <div className={styles.calendarIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07953 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07953 16.7538 3.33334 15.8333 3.33334Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.3333 1.66666V4.99999" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.66669 1.66666V4.99999" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.5 8.33334H17.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className={styles.formDivider}></div>
              </div>

              {/* Repeat section with styling matching image */}
              <div className={styles.formSection}>
                <label className={styles.formLabel}>Repeat</label>
                <div className={styles.repeatSelectContainer}>
                  <div className={styles.repeatIconWrapper}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <select
                    className={styles.repeatSelect}
                    value={newTaskRecurrence}
                    onChange={(e) => setNewTaskRecurrence(e.target.value as Frequency)}
                  >
                    <option value={Frequency.Once}>Once</option>
                    <option value={Frequency.Daily}>Daily</option>
                    <option value={Frequency.Weekly}>Weekly</option>
                    <option value={Frequency.Monthly}>Monthly</option>
                  </select>
                  <div className={styles.selectArrow}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status and Priority in a row to match image exactly */}
              <div className={styles.formRow}>
                <div className={styles.formColumn}>
                  <label className={styles.formLabel}>Status</label>
                  <div className={styles.statusSelectContainer}>
                    <select
                      className={styles.statusSelect}
                      value={newTaskStatus}
                      onChange={(e) => setNewTaskStatus(e.target.value as TaskStatus)}
                    >
                      <option value={TaskStatus.Todo}>To Do</option>
                      <option value={TaskStatus.InProgress}>In Progress</option>
                      <option value={TaskStatus.Done}>Completed</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={styles.formColumn}>
                  <label className={styles.formLabel}>Priority</label>
                  <div className={styles.prioritySelectContainer}>
                    <select
                      className={styles.prioritySelect}
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                    >
                      <option value={TaskPriority.Low}>Low</option>
                      <option value={TaskPriority.Medium}>Medium</option>
                      <option value={TaskPriority.High}>High</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.saveButton}
                  onClick={handleCreateTask}
                  disabled={isCreating || !newTaskTitle.trim()}
                >
                  {isCreating ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TasksContainer;


