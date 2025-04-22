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

import Header from '@/components/header/Header';
import StatusIndicator from '@/components/status/StatusIndicator';
import { CalendarIcon } from '@/lib/icons';
import { TabContent } from './components/TabContent';
import { ActivityLog } from './components/ActivityLog';
import { formatDate } from '@/utils/dateFormat';

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
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [activeTab, setActiveTab] = useState("notes");
  const [noteContent, setNoteContent] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [eventContent, setEventContent] = useState("");
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
        description: newGoalDescription,
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
        setNewGoalDescription('');
        setShowNewGoalForm(false);
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
      <main >
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
                <Image src={TodoIcon} alt="Todo" width={15} height={15} />
              </div>
              <div className={styles.statusTextContainer}>
                <div className={styles.statusCount}>03</div>
                <div className={styles.statusLabel}>To do</div>
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusIcon} style={{ backgroundColor: '#FEF2F2' }}>
                <Image src={InProgressIcon} alt="In Progress" width={15} height={15} />
              </div>
              <div className={styles.statusTextContainer}>
                <div className={styles.statusCount}>02</div>
                <div className={styles.statusLabel}>In Progress</div>
              </div>
            </div>

            <div className={styles.statusCard}>
              <div className={styles.statusIcon} style={{ backgroundColor: '#DCFCE7' }}>
                <Image src={CompletedIcon} alt="Completed" width={15} height={15} />
              </div>
              <div className={styles.statusTextContainer}>
                <div className={styles.statusCount}>01</div>
                <div className={styles.statusLabel}>Completed</div>
              </div>
            </div>
          </div>

          {/* New Goal Form */}
          {showNewGoalForm && (
            <div className={styles.newGoalForm}>
              <div className={styles.formField}>
                <div className={styles.formLabel}>Title</div>
                <input
                  type="text"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Enter goal title..."
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formField}>
                <div className={styles.formLabel}>Description</div>
                <textarea
                  value={newGoalDescription}
                  onChange={(e) => setNewGoalDescription(e.target.value)}
                  placeholder="Enter goal description..."
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.tabsContainer}>
                <div className={styles.tabsHeader}>
                  <div
                    className={`${styles.tabItem} ${activeTab === "notes" ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab("notes")}
                  >
                    Notes
                  </div>
                  <div
                    className={`${styles.tabItem} ${activeTab === "tasks" ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab("tasks")}
                  >
                    Tasks
                  </div>
                  <div
                    className={`${styles.tabItem} ${activeTab === "events" ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab("events")}
                  >
                    Events
                  </div>
                </div>

                <div className={styles.tabContent}>
                  {activeTab === "notes" && (
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Add notes here..."
                      className={styles.tabTextarea}
                    />
                  )}

                  {activeTab === "tasks" && (
                    <textarea
                      value={taskContent}
                      onChange={(e) => setTaskContent(e.target.value)}
                      placeholder="Add tasks here..."
                      className={styles.tabTextarea}
                    />
                  )}

                  {activeTab === "events" && (
                    <textarea
                      value={eventContent}
                      onChange={(e) => setEventContent(e.target.value)}
                      placeholder="Add events here..."
                      className={styles.tabTextarea}
                    />
                  )}
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowNewGoalForm(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleCreateGoal}
                  disabled={isCreating || !newGoalTitle.trim()}
                >
                  {isCreating ? 'Saving...' : 'Save Goal'}
                </button>
              </div>
            </div>
          )}

          {/* Goals List with scrollable container */}
          {!showNewGoalForm && (
            <div className={styles.goalsListContainer}>
              <div className={styles.goalsList}>
                {goals && goals?.data?.map((goal) => {
                  // Calculate progress percentage based on completed and in-progress tasks
                  let progressPercentage = 0;

                  if (goal.totalTaskCount > 0) {
                    // Completed tasks count as 100%, in-progress tasks count as 50%
                    const completedValue = goal.completedTaskCount || 0;
                    const inProgressValue = (goal.inProgressTaskCount || 0) * 0.5;

                    progressPercentage = Math.round(((completedValue + inProgressValue) / goal.totalTaskCount) * 100);
                  }

                  return (
                    <div key={goal._id} className={styles.goalCard} onClick={() => router.push(`/goals/${goal._id}`)}>
                      <div className={styles.goalHeader}>
                        <h3 className={styles.goalTitle}>{goal.title}</h3>
                        <span className={styles.goalFrequency}>{goal.frequency || "Daily"}</span>
                      </div>

                      <div className={styles.goalDates}>
                        Start Date: {formatDate(goal.startDate)} | End Date: {formatDate(goal.endDate)}
                      </div>

                      {goal.totalTaskCount > 0 && (
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
                      )}

                      <div className={styles.progressBarContainer}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                        <div className={styles.progressDot} style={{ left: `${progressPercentage}%` }}></div>
                      </div>
                      <div className={styles.progressText}>
                        {progressPercentage}% completed
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!showNewGoalForm && (
            <div className={styles.newTaskButtonContainer}>
              <button
                className={styles.newTaskButton}
                onClick={() => setShowNewGoalForm(true)}
              >
                <span className={styles.plusIcon}>+</span>
                <span>New Goal</span>
              </button>
            </div>
          )}


        </div>
      </main>
    </>
  );
};

export default GoalsListPage; 