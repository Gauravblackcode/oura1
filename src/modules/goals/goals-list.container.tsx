"use client";

import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useCallback, useMemo } from 'react';
import router, { useRouter } from 'next/router';
import moment from 'moment';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Popover } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import useSWR, { mutate } from 'swr';

import Navigation from '@/components/navigation/Navigation';
import Header from '@/components/header/Header';
import StatusIndicator from '@/components/status/StatusIndicator';
import { CalendarIcon } from '@/lib/icons';
import { TabContent } from './components/TabContent';
import { ActivityLog } from './components/ActivityLog';

import GoalsService from '@/services/goals/goals.service';
import { DefaultSort, DefaultPagination, isDateRangeAllowed } from '@/common/helpers';
import { GoalsQueryVariables, GoalStatus, Frequency } from 'types';
import Image from 'next/image';
import TodoIcon from '@/assets/images/todo.svg';
import InProgressIcon from '@/assets/images/inProgress.svg';
import CompletedIcon from '@/assets/images/completed.svg';

import styles from './goals.module.scss';

const GoalsListPage: NextPage = () => {
  const [filters, setFilters] = useState<GoalsQueryVariables>({
    pagination: DefaultPagination,
    sort: DefaultSort,
  });
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const goalsService = useMemo(() => new GoalsService(), []);
  const { data: goalsData } = useSWR(
    ['goals', filters],
    () => goalsService.getGoals(filters),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const goals = useMemo(() => goalsData?.goals || [], [goalsData]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCreateGoal = async () => {
    if (!newGoalTitle.trim()) return;

    setIsCreating(true);
    try {
      const goalData = {
        title: newGoalTitle,
        description: '',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        isGeneratedByAime: false,
        isRecurring: false,
        status: GoalStatus.Todo,
        tagIds: [],
        taskIds: [],
        recurrenceDetails: null
      };

      const response = await goalsService.createGoal(
        { createGoalDto: goalData },
      );

      if (response?.createGoal?._id) {
        setNewGoalTitle('');
        // Trigger a revalidation of the goals list
        mutate(['goals', filters]);
      }
    } catch (error) {
      console.error('Failed to create goal:', error);
    } finally {
      setIsCreating(false);
    }
  };



  const statusCounts = {
    todo: 3,
    inProgress: 2,
    completed: 1
  };

  return (
    <>
      <Head>
        <title>Goals | Oura 1</title>
        <meta name="description" content="Goals management for Oura 1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main style={{ height: "100vh", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.contentWrapper}>
              {/* Mobile menu button */}
              <div className={styles.mobileMenuButton} onClick={toggleSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Navigation with responsive class */}
              <div className={`${styles.navigation} ${showSidebar ? styles.showNavigation : ''}`}>
                <Navigation />
              </div>

              <div className={styles.mainContent}>
                <Header
                  title="Goals"
                  breadcrumbs={[
                    { label: "Home", path: "/home" },
                    { label: "Goals", path: "/goals" },
                  ]}
                />

                <div className={styles.goalsContainer}>
                  {/* Status Tabs */}
                  <div className={styles.statusTabs}>
                    <div className={styles.statusCard}>
                      <div className={styles.statusIcon} style={{ backgroundColor: '#EEF4FF' }}>
                        <Image src={TodoIcon} alt="Todo" width={24} height={24} />
                      </div>
                      <div className={styles.statusTextContainer}>
                        <div className={styles.statusCount}>03</div>
                        <div className={styles.statusLabel}>To do</div>
                      </div>
                    </div>

                    <div className={styles.statusCard}>
                      <div className={styles.statusIcon} style={{ backgroundColor: '#FEF2F2' }}>
                        <Image src={InProgressIcon} alt="In Progress" width={24} height={24} />
                      </div>
                      <div className={styles.statusTextContainer}>
                        <div className={styles.statusCount}>02</div>
                        <div className={styles.statusLabel}>In Progress</div>
                      </div>
                    </div>

                    <div className={styles.statusCard}>
                      <div className={styles.statusIcon} style={{ backgroundColor: '#DCFCE7' }}>
                        <Image src={CompletedIcon} alt="Completed" width={24} height={24} />
                      </div>
                      <div className={styles.statusTextContainer}>
                        <div className={styles.statusCount}>01</div>
                        <div className={styles.statusLabel}>Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Goals List with scrollable container */}
                  <div className={styles.goalsListContainer}>
                    <div className={styles.goalsList}>
                      {goals && goals?.data?.map((goal) => (
                        <div key={goal._id} className={styles.goalCard} onClick={() => router.push(`/goals/${goal._id}`)}>
                          <div className={styles.goalHeader}>
                            <h3 className={styles.goalTitle}>{goal.title}</h3>
                            <span className={styles.goalFrequency}>{goal.frequency}</span>
                          </div>

                          <div className={styles.goalDates}>
                            Start Date: {goal.startDate} | End Date: {goal.endDate}
                          </div>

                          {goal.title === 'Design portfolio website' || goal.title === 'Real estate website development' ? (
                            <div className={styles.goalTasks}>
                              <div className={styles.taskHeader}>
                                <span className={styles.taskIcon}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </span>
                                <span>Tasks</span>
                                <span className={styles.taskExpand}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          ) : null}

                          <div className={styles.goalProgress}>
                            <div className={styles.progressBar}>
                              <div
                                className={styles.progressFill}
                                style={{
                                  width: `${goal.progress}%`,
                                  backgroundColor: goal.progress > 0 ? '#22C55E' : '#E5E7EB'
                                }}
                              ></div>
                              <div className={styles.progressDot} style={{ right: '0' }}></div>
                            </div>
                            <div className={styles.progressText}>{goal.progress}% completed</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fixed New Goal Button */}
                  <div className={styles.newGoalButtonContainer}>
                    <div className={styles.newGoalButton} onClick={() => router.push('/goals/new')}>
                      <span className={styles.plusIcon}>+</span>
                      <span>New Goal</span>
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

export default GoalsListPage; 