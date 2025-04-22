import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import TasksService from '@/services/tasks/tasks.service';
import { Task, TaskPriority, TaskStatus } from 'types';
import styles from './taskDetail.module.scss';

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Todo);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const tasksService = new TasksService();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    setIsLoading(true);
    try {
      const response = await tasksService.getTask(id as string);
      setTask(response);

      // Initialize form state
      setTitle(response.title);
      setDescription(response.description || '');
      setDueDate(moment(response.dueDate).format('YYYY-MM-DD'));
      setStatus(response.status as TaskStatus);
      setPriority(response.priority as TaskPriority);
      setTags(response.tags || []);
    } catch (error) {
      console.error('Failed to fetch task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await tasksService.updateTask(id as string, {
        title,
        description,
        dueDate: moment(dueDate).toISOString(),
        status,
        priority,
        tags
      });

      // Refresh task data
      fetchTask();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingPulse}></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className={styles.errorContainer}>
        Task not found
      </div>
    );
  }

  return (
    <div className={styles.taskDetailContainer}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.push('/tasks')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
          </svg>
        </button>
        <div className={styles.breadcrumbs}>
          <span onClick={() => router.push('/home')}>Home</span>
          <span>/</span>
          <span onClick={() => router.push('/tasks')}>Tasks</span>
          <span>/</span>
          <span>Task Detail</span>
        </div>
      </div>

      <div className={styles.taskForm}>
        <div className={styles.formSection}>
          <div className={styles.sectionLabel}>Title</div>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.textInput}
            />
          ) : (
            <div className={styles.sectionContent}>{task.title}</div>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionLabel}>Description</div>
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textareaInput}
              rows={4}
            />
          ) : (
            <div className={styles.sectionContent}>{task.description || 'No description'}</div>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionLabel}>Due Date</div>
          {isEditing ? (
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.dateInput}
            />
          ) : (
            <div className={styles.sectionContent}>
              {task.dueDate ? moment(task.dueDate).format('DD/MM/YYYY') : 'No due date'}
              <svg className={styles.calendarIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionLabel}>Recurrence</div>
          <div className={styles.dropdownContainer}>
            <select className={styles.dropdown}>
              <option>Once</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
            <svg className={styles.dropdownIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.sectionLabel}>Status</div>
            {isEditing ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className={styles.dropdown}
              >
                {Object.values(TaskStatus).map(statusOption => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption === 'TODO' ? 'To Do' :
                      statusOption === 'IN_PROGRESS' ? 'In Progress' :
                        statusOption === 'DONE' ? 'Completed' : statusOption}
                  </option>
                ))}
              </select>
            ) : (
              <div className={styles.statusDropdown}>
                <div className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}>
                  {status === 'TODO' ? 'To Do' :
                    status === 'IN_PROGRESS' ? 'In Progress' :
                      status === 'DONE' ? 'Completed' : status}
                </div>
                <svg className={styles.dropdownIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10l5 5 5-5z" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>

          <div className={styles.formColumn}>
            <div className={styles.sectionLabel}>Priority</div>
            {isEditing ? (
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className={styles.dropdown}
              >
                {Object.values(TaskPriority).map(priorityOption => (
                  <option key={priorityOption} value={priorityOption}>
                    {priorityOption}
                  </option>
                ))}
              </select>
            ) : (
              <div className={styles.priorityBadge}>
                {priority}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionLabel}>Tags</div>
          <div className={styles.tagsContainer}>
            {tags.map(tag => (
              <div key={tag} className={styles.tag}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4B7BF5" />
                </svg>
                <span>{tag}</span>
                {isEditing && (
                  <button
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {isEditing && (
              <div className={styles.addTagContainer}>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  className={styles.addTagInput}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <button
                  className={styles.addTagButton}
                  onClick={handleAddTag}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.metaInfo}>
            Created on: {moment(task.createdAt).format('DD MMM YYYY')}
            {task.isGeneratedByAime && (
              <div className={styles.aimeGenerated}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#22C55E" />
                </svg>
                Generated by Aime
              </div>
            )}
          </div>
        </div>

        <div className={styles.linkedSections}>
          <div className={styles.linkedSection}>
            <div className={styles.linkedSectionHeader}>
              <div className={styles.linkedSectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor" />
                </svg>
                Linked Notes
              </div>
              <svg className={styles.expandIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>

            <div className={styles.linkedItem}>
              <div className={styles.linkedItemTitle}>Preparation list</div>
              <div className={styles.linkedItemContent}>
                <div className={styles.linkedItemTask}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#22C55E" />
                  </svg>
                  Prepare meeting agenda
                </div>
                <div className={styles.linkedItemTask}>
                  Make sure previous comments by client are addressed
                </div>
              </div>
              <div className={styles.linkedItemTag}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4B7BF5" />
                </svg>
                Work
              </div>
            </div>
          </div>

          <div className={styles.linkedSection}>
            <div className={styles.linkedSectionHeader}>
              <div className={styles.linkedSectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" fill="currentColor" />
                </svg>
                Linked Events
              </div>
              <svg className={styles.expandIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z" fill="currentColor" />
              </svg>
            </div>

            <div className={styles.linkedItem}>
              <div className={styles.linkedItemTitle}>OURA.1 Weekly sync up</div>
              <div className={styles.linkedItemDate}>
                Date: 06 January 2025 | 10:30 - 11:30am
              </div>
              <div className={styles.linkedItemContent}>
                <div className={styles.linkedItemDetail}>
                  • Budget & Bookings - Flights, accommodations, and transport arrangements.
                </div>
              </div>
              <div className={styles.linkedItemTag}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4B7BF5" />
                </svg>
                Work
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actionButtonContainer}>
        {isEditing ? (
          <button
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;