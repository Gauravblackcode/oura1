"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import moment from 'moment';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Popover } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import useSWR from 'swr';

import Header from '@/components/header/Header';
import StatusIndicator from '@/components/status/StatusIndicator';
import { CalendarIcon } from '@/lib/icons';
import { TabContent } from './components/TabContent';
import { ActivityLog } from './components/ActivityLog';

import GoalsService from '@/services/goals/goals.service';
import { DefaultSort, DefaultPagination, isDateRangeAllowed } from '@/common/helpers';
import { GoalsQueryVariables, GoalStatus, Task, Note, Event } from 'types';
import { TaskStatus } from '@/types/task.types';
import NotesService from '@/services/notes/notes.service';
import TasksService from '@/services/tasks/tasks.service';
import { EventService } from '@/services/event/event.service';

import styles from './goals.module.scss';

const GoalsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [filters, setFilters] = useState<GoalsQueryVariables>({
    pagination: DefaultPagination,
    sort: DefaultSort,
  });
  const [activeTab, setActiveTab] = useState("notes");
  const [noteContent, setNoteContent] = useState("Tentative dates in the month of October\nPlaces that we want to visit: Milan, Greece, Prague\nBudget: $10k");
  const [taskContent, setTaskContent] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(moment());
  const [statusAnchorEl, setStatusAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const goalsService = useMemo(() => new GoalsService(), []);
  const notesService = useMemo(() => new NotesService(), []);
  const tasksService = useMemo(() => new TasksService(), []);
  const eventService = useMemo(() => new EventService(), []);

  const { data: goalData, error: goalError } = useSWR(
    id ? ['goal', id] : null,
    () => goalsService.getGoalById({ id }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const { data: notesData, mutate: mutateNotes } = useSWR(
    ['notes', id],
    () => notesService.getNotes({
      filters: {
        eq: {
          field: 'goalId',
          value: id
        }
      }
    }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const { data: tasksData, mutate: mutateTasks } = useSWR(
    ['tasks', id],
    () => tasksService.getTasks({
      eq: {
        field: 'goalId',
        value: id
      }
    }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const { data: eventsData, mutate: mutateEvents } = useSWR(
    ['events', id],
    () => eventService.getEvents({
      eq: {
        field: 'goalId',
        value: id
      }
    }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const isLoading = id && !goalData && !goalError;
  const goal = goalData?.goal;

  useEffect(() => {
    if (goal) {
      setNoteContent(goal.description || '');
    }
  }, [goal]);

  useEffect(() => {
    if (notesData?.notes?.data) {
      setNotes(notesData.notes.data as Note[]);
    }
  }, [notesData]);

  useEffect(() => {
    if (tasksData?.data) {
      setTasks(tasksData.data as Task[]);
    }
  }, [tasksData]);

  useEffect(() => {
    if (eventsData?.data) {
      setEvents(eventsData.data as Event[]);
    }
  }, [eventsData]);

  const applyFormatting = useCallback((type: string, contentType: string) => {
    const textArea = document.getElementById(`${contentType}-textarea`) as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    let formattedText = '';

    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'align':
        formattedText = `\n::: align-center\n${selectedText}\n:::\n`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      case 'numbered':
        formattedText = selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');
        break;
      default:
        formattedText = selectedText;
    }

    const newText =
      textArea.value.substring(0, start) +
      formattedText +
      textArea.value.substring(end);

    if (contentType === 'note') {
      setNoteContent(newText);
    } else if (contentType === 'task') {
      setTaskContent(newText);
    } else if (contentType === 'event') {
      setEventContent(newText);
    }

    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  }, []);

  const isCalendarOpen = Boolean(calendarAnchorEl);
  const isStatusMenuOpen = Boolean(statusAnchorEl);

  const refreshData = useCallback(() => {
    mutateNotes();
    mutateTasks();
    mutateEvents();
  }, [mutateNotes, mutateTasks, mutateEvents]);

  const handleCheckboxChange = async (taskId: string, checked: boolean) => {
    await tasksService.updateTask(taskId, {
      status: checked ? TaskStatus.Done : TaskStatus.Todo
    });
    await mutateTasks();
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const handleStatusChange = (status: string) => {
    console.log('Status changed to:', status);
    handleStatusClose();
  };

  return (
    <>
      <Head>
        <title>{goal?.title || 'Goal'} | Oura 1</title>
        <meta name="description" content={goal?.description || 'Goal management for Oura 1'} />
      </Head>
      <main style={{ height: "100vh", overflow: "hidden" }}>
        <div className={styles.goalsContainer}>
          <div>
            <div>

              <div>
                <Header
                  title={goal?.title || 'Loading...'}
                  breadcrumbs={[
                    { label: "Home", path: "/home" },
                    { label: "Goals", path: "/goals" },
                    { label: goal?.title || "Goal Detail" }
                  ]}
                />

                <StatusIndicator
                  message="Update the task status"
                  type="warning"
                  onClose={() => { }}
                />

                <div className={styles.twoColumnLayout}>
                  <div className={styles.mobileRightColumn}>
                    <div className={styles.dateStatusContainer}>
                      <div className={styles.dueDateContainer}>
                        <div className={styles.calendarIcon}>
                          <CalendarIcon size={16} color="#000000" />
                        </div>
                        <span className={styles.dueDateText}>Due Date</span>
                      </div>

                      <button
                        type="button"
                        className={styles.todoButton}
                        onClick={handleStatusClick}
                      >
                        To do
                      </button>

                      <Popover
                        open={isStatusMenuOpen}
                        anchorEl={statusAnchorEl}
                        onClose={handleStatusClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        PaperProps={{
                          style: {
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            marginTop: '10px',
                          },
                        }}
                      >
                        <div className={styles.statusMenu}>
                          <div
                            className={styles.statusMenuItem}
                            onClick={() => handleStatusChange('inProgress')}
                          >
                            In Progress
                          </div>
                          <div
                            className={styles.statusMenuItem}
                            onClick={() => handleStatusChange('completed')}
                          >
                            Completed
                            <span className={styles.checkIcon}>✓</span>
                          </div>
                        </div>
                      </Popover>
                    </div>
                  </div>

                  <div className={styles.leftColumn}>
                    <div className={styles.completionPercentage}>
                      <span className={styles.completionPercentageText}>
                        {goal?.completedTaskCount && goal?.totalTaskCount
                          ? `${Math.round((goal.completedTaskCount / goal.totalTaskCount) * 100)}% Completed`
                          : '0% Completed'}
                      </span>
                    </div>

                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBar}></div>
                    </div>

                    <div className={styles.goalDetailsForm}>
                      <Formik
                        initialValues={{
                          title: goal?.title || "",
                          description: goal?.description || "",
                          startDate: goal?.startDate || moment().format('YYYY-MM-DD'),
                          endDate: goal?.endDate || moment().add(1, 'day').format('YYYY-MM-DD'),
                          isGeneratedByAime: goal?.isGeneratedByAime || false,
                          isRecurring: Boolean(goal?.recurrenceDetails),
                          status: goal?.status || GoalStatus.Todo,
                          tagIds: goal?.tagIds || [],
                          taskIds: tasks.map(task => task._id) || [],
                          recurrenceDetails: goal?.recurrenceDetails || null
                        }}
                        enableReinitialize={true}
                        onSubmit={(values, actions) => {
                          const context = {
                            headers: {
                              'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                              'Access-Control-Allow-Origin': '*',
                              'Content-Type': 'application/json'
                            },
                            silent: false
                          };

                          const goalData = {
                            ...values,
                            recurrenceDetails: values.isRecurring ? values.recurrenceDetails : undefined
                          };

                          goalsService.createGoal(
                            { createGoalDto: goalData },
                            context
                          ).then(response => {
                            if (response?.createGoal?._id) {
                              router.push(`/goals/${response.createGoal._id}`);
                            }
                          }).catch(error => {
                            console.error('Failed to create goal:', error);
                          }).finally(() => {
                            actions.setSubmitting(false);
                          });
                        }}
                        validationSchema={Yup.object().shape({
                          title: Yup.string()
                            .min(2, 'Title is too short')
                            .max(256, 'Title cannot exceed 256 characters')
                            .required('Title is required'),
                          description: Yup.string()
                            .max(1000, 'Description cannot exceed 1000 characters'),
                          startDate: Yup.date()
                            .required('Start date is required'),
                          endDate: Yup.date()
                            .required('End date is required')
                            .test('date-range', 'Date range cannot exceed 365 days', function (value) {
                              const { startDate } = this.parent;
                              if (startDate && value) {
                                return isDateRangeAllowed({
                                  startDate: moment(startDate),
                                  endDate: moment(value),
                                  maxAllowedRange: 365
                                });
                              }
                              return true;
                            })
                        })}
                      >
                        {({ values, handleChange, handleBlur, isSubmitting }) => (
                          <Form>
                            <div className={styles.formField}>
                              <div className={styles.formLabel}>
                                Title
                              </div>
                              <input
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter title here..."
                                className={styles.formInput}
                              />
                            </div>

                            <div className={styles.formField}>
                              <div className={styles.formLabel}>
                                Description
                              </div>
                              <textarea
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter description here..."
                                className={styles.formTextarea}
                              />
                            </div>


                          </Form>
                        )}
                      </Formik>
                    </div>

                    <div className={styles.formActions}>
                      <button
                        style={{
                          marginTop: '20px',
                          padding: '15px 20px',
                          backgroundColor: '#D24D21',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          width: '100%',
                          position: 'relative',
                          marginBottom: '20px',
                        }}
                        onClick={(event) => {
                          const formValues = document.querySelector('form')?.elements;
                          const titleElement = formValues?.namedItem('title') as HTMLInputElement;
                          const descriptionElement = formValues?.namedItem('description') as HTMLTextAreaElement;

                          const title = titleElement?.value || "Plan Europe Trip";
                          const description = descriptionElement?.value ||
                            "Plan a well-structured Europe trip by finalising destinations, budgeting, booking flights, accommodations, and creating an itinerary for a smooth travel experience.";

                          const goalData = {
                            title,
                            description,
                            startDate: moment().format('YYYY-MM-DD'),
                            endDate: moment().add(1, 'day').format('YYYY-MM-DD'),
                            isGeneratedByAime: false,
                            isRecurring: false,
                            status: GoalStatus.Todo,
                            tagIds: [],
                            taskIds: [],
                            recurrenceDetails: null
                          };

                          const context = {
                            headers: {
                              'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                              'Access-Control-Allow-Origin': '*',
                              'Content-Type': 'application/json'
                            },
                            silent: false
                          };

                          const button = event.currentTarget as HTMLButtonElement;
                          const originalText = button.textContent;
                          button.disabled = true;
                          button.textContent = 'Saving...';

                          goalsService.updateGoal(
                            {
                              id,
                              updateGoalDto: goalData
                            },
                            context
                          )
                            .then(response => {
                              if (response?.updateGoal?._id) {
                                router.push(`/goals/${response.updateGoal._id}`);
                              }
                            })
                            .catch(error => {
                              console.error('Failed to update goal:', error);
                              alert("Error: " + error.message);
                            })
                            .finally(() => {
                              button.disabled = false;
                              button.textContent = originalText;
                            });
                        }}
                      >
                        Save
                      </button>
                    </div>

                    <div className={styles.tabsContainer}>
                      <div className={styles.tabsHeader}>
                        <div
                          className={`${styles.tabItem} ${activeTab === "notes" ? styles.activeTab : ''}`}
                          onClick={() => setActiveTab("notes")}
                        >
                          Notes ({notes?.length || 0})
                        </div>
                        <div
                          className={`${styles.tabItem} ${activeTab === "tasks" ? styles.activeTab : ''}`}
                          onClick={() => setActiveTab("tasks")}
                        >
                          Tasks ({tasks?.length || 0})
                        </div>
                        <div
                          className={`${styles.tabItem} ${activeTab === "events" ? styles.activeTab : ''}`}
                          onClick={() => setActiveTab("events")}
                        >
                          Events ({events?.length || 0})
                        </div>
                      </div>

                      <div className={styles.tabContent}>
                        <div className={styles.tabPanel}>
                          {/* Show existing items first */}
                          {activeTab === "notes" && notes.map((note) => (
                            <div key={note._id} className={styles.listItem} style={{
                              backgroundColor: '#f5f5f5',
                              borderRadius: '8px',
                              padding: '16px',
                              marginBottom: '12px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                              <div className={styles.itemContent}>
                                {note.content}
                              </div>
                              <div className={styles.itemMeta}>
                                {moment(note.createdAt).format('MMM D, YYYY')}
                              </div>
                            </div>
                          ))}

                          {activeTab === "tasks" && tasks.map((task) => (
                            <div key={task._id} className={styles.listItem}>
                              <div className={styles.itemContent}>
                                <input
                                  type="checkbox"
                                  checked={task.status === TaskStatus.Done}
                                  onChange={async () => {
                                    await handleCheckboxChange(task._id, !task.status);
                                  }}
                                  className={styles.checkbox}
                                />
                                {task.status === TaskStatus.Done && (
                                  <s className="text-gray-500">{task.title}</s>
                                )}
                                {task.status !== TaskStatus.Done && task.title}
                              </div>
                              <div className={styles.itemMeta} style={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '12px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}>
                                {task.dueDate && (
                                  <span className={styles.dueDate}>
                                    Due: {moment(task.dueDate).format('MMM D, YYYY')}
                                  </span>
                                )}
                                <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                                  {task.priority}
                                </span>
                                {moment(task.createdAt).format('MMM D, YYYY')}
                              </div>
                            </div>
                          ))}

                          {activeTab === "events" && events.map((event) => (
                            <div key={event._id} className={styles.listItem}>
                              <div className={styles.itemContent} style={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '12px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}>
                                {event.description}
                              </div>
                              <div className={styles.itemMeta}>
                                {moment(event.createdAt).format('MMM D, YYYY')}
                              </div>
                            </div>
                          ))}

                          {/* Tab Content Editor */}
                          <TabContent
                            activeTab={activeTab}
                            noteContent={noteContent}
                            taskContent={taskContent}
                            eventContent={eventContent}
                            setNoteContent={setNoteContent}
                            setTaskContent={setTaskContent}
                            setEventContent={setEventContent}
                            applyFormatting={applyFormatting}
                            goalId={id as string}
                            onSave={refreshData}
                            mutateNotes={mutateNotes}
                            mutateTasks={mutateTasks}
                            mutateEvents={mutateEvents}
                          />
                        </div>
                      </div>
                    </div>

                    <ActivityLog />
                  </div>

                  <div className={styles.rightColumn}>
                    {/* ... existing right column content ... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default GoalsPage;