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

import styles from './goals.module.scss';

const GoalsListPage: NextPage = () => {
  const [filters, setFilters] = useState<GoalsQueryVariables>({
    pagination: DefaultPagination,
    sort: DefaultSort,
  });
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

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

  console.log(goals);

  return (
    <>
      <Head>
        <title>Goals | Oura 1</title>
        <meta name="description" content="Goals management for Oura 1" />
      </Head>
      <main style={{ height: "100vh", overflow: "hidden" }}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.contentWrapper}>
              <Navigation />

              <div className={styles.mainContent}>
                <Header
                  title="Plan Europe trip"
                  breadcrumbs={[
                    { label: "Home", path: "/home" },
                    { label: "Goals", path: "/goals" },
                  ]}
                />

                <StatusIndicator
                  message="Update the task status"
                  type="warning"
                  onClose={() => { }}
                />

                <div className={styles.twoColumnLayout}>
                  <div className={styles.leftColumn}>
                   <ul>
                    <li>To do</li>
                    <li>In Progress</li>
                    <li>Done</li>
                   </ul>

                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBar}></div>
                    </div>

                    <div className={styles.goalDetailsForm}>
                            <ul style={{
                              listStyleType: 'none',
                              display: 'grid',
                              gap: '1rem',
                              padding: '0'
                            }}>
                              {goals && goals?.data?.map((goal) => (
                                <li 
                                  key={goal._id} 
                                  onClick={() => router.push(`/goals/${goal._id}`)}
                                  style={{
                                    padding: '2rem',
                                    backgroundColor: 'white', 
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                                    display: 'grid',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                                    }
                                  }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 500 }}>{goal.title}</span>
                                    <span style={{ color: '#666' }}>{goal.description}</span>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                      <span style={{ color: '#888' }}>{goal.dueDate}</span>
                                      <span style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '999px',
                                        backgroundColor: goal.status === 'COMPLETED' ? '#dcfce7' : '#fee2e2',
                                        color: goal.status === 'COMPLETED' ? '#166534' : '#991b1b'
                                      }}>{goal.status}</span>
                                      <span style={{ color: '#2563eb', cursor: 'pointer' }}>Actions</span>
                                    </div>
                                </li>
                              ))}
                          

                            <li style={{
                              padding: '1rem',
                              border: '2px dashed #ccc',
                              borderRadius: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <span style={{ color: '#666' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                              </span>
                              <input
                                type="text"
                                placeholder="New goal"
                                value={newGoalTitle}
                                onChange={(e) => setNewGoalTitle(e.target.value)}
                                style={{
                                  flex: 1,
                                  border: 'none',
                                  outline: 'none',
                                  fontSize: '1rem',
                                  backgroundColor: 'transparent'
                                }}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && !isCreating) {
                                    handleCreateGoal();
                                  }
                                }}
                              />
                              <button
                                style={{
                                  padding: '0.5rem 1rem',
                                  backgroundColor: '#2563eb',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '0.375rem',
                                  cursor: 'pointer',
                                  opacity: isCreating ? 0.7 : 1
                                }}
                                onClick={handleCreateGoal}
                                disabled={isCreating}
                              >
                                {isCreating ? 'Saving...' : 'Save'}
                              </button>
                            </li>
                      
                            </ul>
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