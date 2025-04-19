import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Popover } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import GoalsService from '@/services/goals/goals.service';
import { GoalStatus } from 'types';

import Navigation from '@/components/navigation/Navigation';
import Header from '@/components/header/Header';
import StatusIndicator from '@/components/status/StatusIndicator';
import { CalendarIcon, TagIcon, StickyNoteIcon } from '@/lib/icons';
import aime from '@/assets/images/anime.svg';
import styles from '@/styles/tasks.module.scss';

const Tasks = () => {
  const router = useRouter();
  const [showStatusMessage, setShowStatusMessage] = useState(true);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(moment());
  const [notesExpanded, setNotesExpanded] = useState(true);
  const [eventsExpanded, setEventsExpanded] = useState(true);

  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setCalendarAnchorEl(null);
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
    setCalendarAnchorEl(null);
  };

  const isCalendarOpen = Boolean(calendarAnchorEl);

  const toggleNotes = () => {
    setNotesExpanded(!notesExpanded);
  };

  const toggleEvents = () => {
    setEventsExpanded(!eventsExpanded);
  };

  const goalsService = React.useMemo(() => new GoalsService(), []);

  return (
    <>
      <Head>
        <title>Tasks | Oura 1</title>
        <meta name="description" content="Task management for Oura 1" />
      </Head>
      <main style={{ height: "100vh", overflow: "hidden" }}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.contentWrapper}>
              <Navigation />

              <div className={styles.mainContent}>
                <Header
                  title="Tasks"
                  breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Tasks' }
                  ]}
                />

                {showStatusMessage && (
                  <StatusIndicator
                    message="Update the task status"
                    onClose={() => setShowStatusMessage(false)}
                  />
                )}

                <div className={styles.twoColumnLayout}>
                  <div className={styles.leftColumn}>
                    <div style={{
                      marginTop: '24px',
                      borderBottom: '1px solid #E5E7EB',
                      paddingBottom: '16px',
                      width: '50%'
                    }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        margin: '0 0 12px 0',
                        color: '#6B7280'
                      }}>
                        Due Date
                      </h3>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#111827'
                        }}>
                          {selectedDate ? selectedDate.format('DD/MM/YYYY') : '06/01/2025'}
                        </span>
                        <button
                          onClick={handleCalendarOpen}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <CalendarIcon />
                        </button>
                      </div>
                    </div>

                    <div style={{
                      marginTop: '20px'
                    }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        margin: '0 0 12px 0',
                        color: '#6B7280'
                      }}>
                        Tags
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 12px',
                          borderRadius: '5px',
                          backgroundColor: '#EBF5FF',
                          color: '#4C9AFF',
                          fontSize: '14px'
                        }}>
                          <TagIcon size={12} color="#4C9AFF" />
                          Personal
                        </div>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 12px',
                          borderRadius: '5px',
                          backgroundColor: '#F3F4F6',
                          color: '#6B7280',
                          fontSize: '14px',
                          border: 'none',
                          cursor: 'pointer'
                        }}>
                          <TagIcon size={12} color="#6B7280" />
                          Add tag
                        </button>
                      </div>
                    </div>

                    <div className={styles.goalDetailsForm}>
                      <Formik
                        initialValues={{
                          title: "Review designs with client",
                          description: "Review the latest design mockups with the client and gather feedback for the next iteration."
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                          try {

                            const taskData = {
                              title: values.title,
                              description: values.description,
                              startDate: moment().format('YYYY-MM-DD'),
                              endDate: moment().add(1, 'day').format('YYYY-MM-DD'),
                              isGeneratedByAime: false,
                              isRecurring: false,
                              status: GoalStatus.Todo,
                              tagIds: [],
                              taskIds: []
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

                            const response = await goalsService.createGoal(
                              { createGoalDto: taskData },
                              context
                            );


                            if (response?.createGoal?._id) {
                              router.push(`/tasks/${response.createGoal._id}`);
                            }
                          } catch (error) {
                            console.error('Failed to create task:', error);
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                      >
                        {({ values, handleChange, handleBlur, isSubmitting, setSubmitting }) => (
                          <>
                            <Form>
                              <div className={styles.formField}>
                                <label className={styles.formLabel}>
                                  Title
                                </label>
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
                                <label className={styles.formLabel}>
                                  Description
                                </label>
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

                            <div className={styles.linkedSection}>
                              <div className={styles.linkedHeader} onClick={toggleNotes}>
                                <div className={styles.linkedTitle}>
                                  <StickyNoteIcon />
                                  <span>Linked Notes</span>
                                </div>
                                <svg className={`${styles.chevronIcon} ${notesExpanded ? styles.expanded : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18 15L12 9L6 15" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>

                              {notesExpanded && (
                                <div className={styles.linkedContent}>
                                  <div className={styles.noteCard}>
                                    <div className={styles.noteHeader}>
                                      <h4>Preparation list</h4>
                                      <svg className={styles.moreIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </div>
                                    <div className={styles.noteContent}>
                                      <p>Prepare meeting agenda</p>
                                      <p>Make sure previous comments by client are addressed</p>
                                    </div>
                                    <div className={styles.noteTag}>
                                      <TagIcon size={12} color="#4C9AFF" />
                                      <span>Work</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className={styles.linkedSection}>
                              <div className={styles.linkedHeader} onClick={toggleEvents}>
                                <div className={styles.linkedTitle}>
                                  <CalendarIcon />
                                  <span> Linked Events</span>
                                </div>
                                <svg className={`${styles.chevronIcon} ${eventsExpanded ? styles.expanded : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18 15L12 9L6 15" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>

                              {eventsExpanded && (
                                <div className={styles.linkedContent}>
                                  <div className={styles.eventCard}>
                                    <div className={styles.eventHeader}>
                                      <h4>OURA.1 Weekly sync up</h4>
                                      <svg className={styles.moreIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </div>
                                    <div className={styles.eventDate}>
                                      Date: 06 January 2025 | 10:30 - 11:30am
                                    </div>
                                    <div className={styles.eventContent}>
                                      <ul>
                                        <li>Budget & Bookings – Flights, accommodations, and transport arrangements.</li>
                                      </ul>
                                    </div>
                                    <div className={styles.eventTag}>
                                      <TagIcon size={12} color="#4C9AFF" />
                                      <span>Work</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

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
                              }}
                              onClick={() => {

                                // Proceed with the API call
                                const taskData = {
                                  title: values.title,
                                  description: values.description,
                                  startDate: moment().format('YYYY-MM-DD'),
                                  endDate: moment().add(1, 'day').format('YYYY-MM-DD'),
                                  isGeneratedByAime: false,
                                  isRecurring: false,
                                  status: GoalStatus.Todo,
                                  tagIds: [],
                                  taskIds: []
                                };

                                // Create a context object with the API key
                                const context = {
                                  headers: {
                                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'application/json'
                                  },
                                  silent: false
                                };

                                setSubmitting(true);
                                goalsService.createGoal(
                                  { createGoalDto: taskData },
                                  context
                                )
                                  .then(response => {
                                    if (response?.createGoal?._id) {
                                      router.push(`/tasks/${response.createGoal._id}`);
                                    }
                                  })
                                  .catch(error => {
                                    console.error('Failed to create task:', error);
                                    alert("Error: " + error.message);
                                  })
                                  .finally(() => {
                                    setSubmitting(false);
                                  });
                              }}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Saving...' : 'Save'}
                            </button>
                          </>
                        )}
                      </Formik>
                    </div>
                  </div>

                  <div className={styles.rightColumn}>
                    <div className={styles.dateStatusContainer}>
                      <div style={{
                        marginTop: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '20px'
                        }}>
                          <div>
                            <h3 style={{
                              fontSize: '14px',
                              fontWeight: 500,
                              margin: '0 0 12px 0',
                              color: '#6B7280'
                            }}>
                              Status
                            </h3>
                            <div style={{
                              display: 'inline-block',
                              padding: '8px 46px',
                              borderRadius: '5px',
                              border: '1px solid #4C9AFF',
                              color: '#4C9AFF',
                              fontSize: '14px',
                              fontWeight: 500
                            }}>
                              To do
                            </div>
                          </div>

                          <div>
                            <h3 style={{
                              fontSize: '14px',
                              fontWeight: 500,
                              margin: '0 0 12px 0',
                              color: '#6B7280'
                            }}>
                              Priority
                            </h3>
                            <div style={{
                              display: 'inline-block',
                              padding: '8px 16px',
                              borderRadius: '15px',
                              backgroundColor: '#F5F3EB',
                              color: '#DFB400',
                              fontSize: '14px',
                              fontWeight: 500
                            }}>
                              Medium
                            </div>
                          </div>
                        </div>

                        <div style={{
                          marginTop: '10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '20px'
                        }}>
                          <div style={{
                            fontSize: '14px',
                            color: '#6B7280'
                          }}>
                            Created on: 23 Feb 2025
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Image src={aime} alt="Check" width={16} height={16} />
                            <span style={{ fontSize: '14px', color: '#1FC16B' }}>Generated by Aime</span>
                          </div>
                        </div>
                      </div>

                      <Popover
                        open={isCalendarOpen}
                        anchorEl={calendarAnchorEl}
                        onClose={handleCalendarClose}
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
                            onChange={handleDateChange}
                            sx={{
                              '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
                                backgroundColor: '#D24D21',
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

export default Tasks;
