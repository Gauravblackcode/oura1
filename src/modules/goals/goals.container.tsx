import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Popover } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import useSWR from 'swr';

import Navigation from '@/components/navigation/Navigation';
import Header from '@/components/header/Header';
import StatusIndicator from '@/components/status/StatusIndicator';
import { CalendarIcon } from '@/lib/icons';
import { TabContent } from './components/TabContent';
import { ActivityLog } from './components/ActivityLog';

import GoalsService from '@/services/goals/goals.service';
import { DefaultSort, DefaultPagination, isDateRangeAllowed } from '@/common/helpers';
import { GoalsQueryVariables, GoalStatus, Frequency } from 'types';

import styles from './goals.module.scss';

const GoalsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
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

  const goalsService = useMemo(() => new GoalsService(), []);

  const { data: goalData, error: goalError } = useSWR(
    id ? ['goal', id] : null,
    () => goalsService.getGoalById({ id: id as string }),
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

  if (goalError) {
    console.error('Failed to fetch goal:', goalError);
    return <div>Error loading goal</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const handleCalendarOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
  //   setCalendarAnchorEl(event.currentTarget);
  // }, []);

  // const handleCalendarClose = useCallback(() => {
  //   setCalendarAnchorEl(null);
  // }, []);

  // const handleDateChange = useCallback((date: moment.Moment | null) => {
  //   setSelectedDate(date);
  //   setCalendarAnchorEl(null);
  // }, []);

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

  return (
    <>
      <Head>
        <title>{goal?.title || 'Goal'} | Oura 1</title>
        <meta name="description" content={goal?.description || 'Goal management for Oura 1'} />
      </Head>
      <main style={{ height: "100vh", overflow: "hidden" }}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.contentWrapper}>
              <Navigation />

              <div className={styles.mainContent}>
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
                          taskIds: goal?.taskIds || [],
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

                          goalsService.createGoal(
                            { createGoalDto: goalData },
                            context
                          )
                            .then(response => {
                              if (response?.createGoal?._id) {
                                router.push(`/goals/${response.createGoal._id}`);
                              }
                            })
                            .catch(error => {
                              console.error('Failed to create goal:', error);
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
                          Notes (03)
                        </div>
                        <div
                          className={`${styles.tabItem} ${activeTab === "tasks" ? styles.activeTab : ''}`}
                          onClick={() => setActiveTab("tasks")}
                        >
                          Tasks (02)
                        </div>
                        <div
                          className={`${styles.tabItem} ${activeTab === "events" ? styles.activeTab : ''}`}
                          onClick={() => setActiveTab("events")}
                        >
                          Events (02)
                        </div>
                      </div>

                      <div className={styles.tabContent}>
                        <TabContent
                          activeTab={activeTab}
                          noteContent={noteContent}
                          taskContent={taskContent}
                          eventContent={eventContent}
                          setNoteContent={setNoteContent}
                          setTaskContent={setTaskContent}
                          setEventContent={setEventContent}
                          applyFormatting={applyFormatting}
                        />
                      </div>
                    </div>

                    <ActivityLog />
                  </div>

                  <div className={styles.rightColumn}>
                    <div className={styles.dateStatusContainer}>
                      <div className={styles.dueDateContainer}>
                        <div
                          // onClick={handleCalendarOpen}
                          className={styles.calendarIcon}
                        >
                          <CalendarIcon size={16} color="#000000" />
                        </div>
                        <span className={styles.dueDateText}>Due Date</span>
                      </div>

                      <button
                        type="button"
                        className={styles.todoButton}
                      >
                        Todo
                      </button>

                      <Popover
                        open={isCalendarOpen}
                        anchorEl={calendarAnchorEl}
                        // onClose={handleCalendarClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DateCalendar
                            value={selectedDate}
                            // onChange={handleDateChange}
                            sx={{
                              '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
                                backgroundColor: '#0D6EFD',
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GoalsPage; 