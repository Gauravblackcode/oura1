import { NextPage } from 'next';
import Head from 'next/head';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import useSWR from 'swr';
import { EventService } from '@/services/event/event.service';
import { FiltersDto, PaginationDto, SortDto, SortOrder } from 'types';
import styles from './events.module.scss';

const eventService = new EventService();

const fetcher = async ([_, params]: [string, { filters: FiltersDto; sort: SortDto; pagination: PaginationDto }]) => {
  const { filters, sort, pagination } = params;
  return eventService.getEvents(filters, pagination, sort);
};

const Events: NextPage = () => {
  const [filters, setFilters] = useState<FiltersDto>({});
  const [sort, setSort] = useState<SortDto>({ field: 'scheduledStartsAt', order: SortOrder.Asc });
  const [pagination, setPagination] = useState<PaginationDto>({
    pageSize: 100, // Larger page size for calendar view
    pageNo: 1
  });
  const [activeFilter, setActiveFilter] = useState('all');

  // Get current date to create relative dates for dummy events
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Add dummy events that will be merged with API data - using current month dates
  const dummyEvents = [
    {
      _id: 'dummy-1',
      title: 'Meeting with John',
      scheduledStartsAt: new Date(currentYear, currentMonth, 3, 10, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 3, 11, 0).toISOString(),
      status: 'TODO',
      description: 'Discuss project requirements',
      isGeneratedByAime: false
    },
    {
      _id: 'dummy-2',
      title: 'Team meeting',
      scheduledStartsAt: new Date(currentYear, currentMonth, 4, 14, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 4, 15, 30).toISOString(),
      status: 'IN_PROGRESS',
      description: 'Weekly team sync',
      isGeneratedByAime: true
    },
    {
      _id: 'dummy-3',
      title: 'Product Launch Plan',
      scheduledStartsAt: new Date(currentYear, currentMonth, 5, 9, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 5, 10, 30).toISOString(),
      status: 'DONE',
      description: 'Finalize product launch strategy',
      isGeneratedByAime: false
    },
    {
      _id: 'dummy-4',
      title: 'Coding session',
      scheduledStartsAt: new Date(currentYear, currentMonth, 6, 13, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 6, 16, 0).toISOString(),
      status: 'IN_PROGRESS',
      description: 'Work on new features',
      isGeneratedByAime: true
    },
    {
      _id: 'dummy-5',
      title: 'Travel essential docs',
      scheduledStartsAt: new Date(currentYear, currentMonth, 4, 9, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 4, 10, 0).toISOString(),
      status: 'TODO',
      description: 'Prepare travel documents',
      isGeneratedByAime: false
    },
    {
      _id: 'dummy-6',
      title: 'Coding session',
      scheduledStartsAt: new Date(currentYear, currentMonth, 5, 13, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 5, 15, 0).toISOString(),
      status: 'IN_PROGRESS',
      description: 'Work on new features',
      isGeneratedByAime: true
    },
    {
      _id: 'dummy-7',
      title: 'Yoga class',
      scheduledStartsAt: new Date(currentYear, currentMonth, 6, 8, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 6, 9, 0).toISOString(),
      status: 'TODO',
      description: 'Morning yoga session',
      isGeneratedByAime: false
    },
    {
      _id: 'dummy-8',
      title: 'Meeting with John',
      scheduledStartsAt: new Date(currentYear, currentMonth, 10, 15, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 10, 16, 0).toISOString(),
      status: 'TODO',
      description: 'Follow-up meeting',
      isGeneratedByAime: false
    },
    {
      _id: 'dummy-9',
      title: 'Design review',
      scheduledStartsAt: new Date(currentYear, currentMonth, 23, 11, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 23, 12, 0).toISOString(),
      status: 'IN_PROGRESS',
      description: 'Review design mockups',
      isGeneratedByAime: true
    },
    {
      _id: 'dummy-10',
      title: 'Coffee Catch-up',
      scheduledStartsAt: new Date(currentYear, currentMonth, 25, 14, 0).toISOString(),
      scheduledEndsAt: new Date(currentYear, currentMonth, 25, 15, 0).toISOString(),
      status: 'TODO',
      description: 'Casual coffee with team',
      isGeneratedByAime: false
    }
  ];

  const { data, error, isLoading } = useSWR(
    ['events', { filters, sort, pagination }],
    fetcher
  );

  // Format events for the calendar with appropriate colors based on status
  const formattedEvents = [...(data?.data || []), ...dummyEvents].map(event => {
    // Determine color based on status or other properties
    let backgroundColor, borderColor, textColor;

    if (event.status === 'TODO') {
      backgroundColor = '#FEF3F2';
      borderColor = '#F04438';
      textColor = '#B42318';
    } else if (event.status === 'IN_PROGRESS') {
      backgroundColor = '#FFFAEB';
      borderColor = '#F79009';
      textColor = '#B54708';
    } else if (event.status === 'DONE') {
      backgroundColor = '#ECFDF3';
      borderColor = '#12B76A';
      textColor = '#027A48';
    } else {
      // Default colors
      backgroundColor = event.isGeneratedByAime ? '#F3F6FF' : '#D24D21';
      borderColor = event.isGeneratedByAime ? '#4C9AFF' : '#D24D21';
      textColor = event.isGeneratedByAime ? '#1D1B20' : 'white';
    }

    return {
      id: event._id,
      title: event.title,
      start: event.scheduledStartsAt,
      end: event.scheduledEndsAt,
      backgroundColor,
      borderColor,
      textColor,
      extendedProps: {
        description: event.description,
        isGeneratedByAime: event.isGeneratedByAime,
        goalId: event.goalId,
        taskIds: event.taskIds,
        status: event.status
      }
    };
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);

    let newFilters: FiltersDto = {};
    if (filter === 'todo') {
      newFilters = { status: 'TODO' };
    } else if (filter === 'inProgress') {
      newFilters = { status: 'IN_PROGRESS' };
    } else if (filter === 'completed') {
      newFilters = { status: 'DONE' };
    }

    setFilters(newFilters);
  };

  // Handle event click
  const handleEventClick = (info: any) => {
    console.log('Event clicked:', info.event);
    // You can add navigation to event detail page or show a modal
  };

  // Handle date click to add new event
  const handleDateClick = (info: any) => {
    console.log('Date clicked:', info.dateStr);
    // You can open a new event form pre-filled with this date
  };

  // Add a function to create a new event
  const handleAddEvent = () => {
    console.log('Adding new event');
    // Here you would typically open a modal or navigate to a form
    // For now, we're just showing the dummy events
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Failed to load events</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Events | OURA.1</title>
      </Head>
      <main className={styles.eventsPage}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className={styles.title}>Events</h1>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search anything here..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.sortBy}>
            <span>Sort by</span>
            <select className={styles.sortSelect}>
              <option>Date</option>
              <option>Title</option>
              <option>Status</option>
            </select>
          </div>
          <div>
            <select className={styles.viewDropdown}>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Daily</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${activeFilter === 'all' ? styles.activeFilterTab : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Events
          </button>
          <button
            className={`${styles.filterTab} ${activeFilter === 'todo' ? styles.activeFilterTab : ''}`}
            onClick={() => handleFilterChange('todo')}
          >
            To do
          </button>
          <button
            className={`${styles.filterTab} ${activeFilter === 'inProgress' ? styles.activeFilterTab : ''}`}
            onClick={() => handleFilterChange('inProgress')}
          >
            In Progress
          </button>
          <button
            className={`${styles.filterTab} ${activeFilter === 'completed' ? styles.activeFilterTab : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>

        {/* Status Cards */}
        <div className={styles.statusTabs}>
          <div className={styles.statusCard}>
            <div className={styles.statusIcon} style={{ backgroundColor: '#EEF4FF' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M16 8L8 16M8 8L16 16" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.statusTextContainer}>
              <div className={styles.statusCount}>01</div>
              <div className={styles.statusLabel}>To do</div>
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIcon} style={{ backgroundColor: '#FFF4E5' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 8v4l2 2" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20a8 8 0 100-16 8 8 0 000 16z" stroke="#F97316" strokeWidth="1.5" />
              </svg>
            </div>
            <div className={styles.statusTextContainer}>
              <div className={styles.statusCount}>01</div>
              <div className={styles.statusLabel}>In Progress</div>
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIcon} style={{ backgroundColor: '#E6F9F1' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M16 9l-5 5-3-3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.statusTextContainer}>
              <div className={styles.statusCount}>00</div>
              <div className={styles.statusLabel}>Completed</div>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}>
            <div className={styles.calendarNavigation}>
              <button className={styles.navButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className={styles.navButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <h2 className={styles.calendarTitle}>Apr 2025</h2>
            <div className={styles.viewControls}>
              <button className={styles.viewButton}>month</button>
              <button className={`${styles.viewButton} ${styles.active}`}>week</button>
              <button className={styles.viewButton}>day</button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className={styles.calendarGrid}>
            {/* Weekday Headers */}
            <div className={styles.weekdayHeader}>
              <div className={styles.weekday}>S</div>
              <div className={styles.weekday}>M</div>
              <div className={styles.weekday}>T</div>
              <div className={styles.weekday}>W</div>
              <div className={styles.weekday}>T</div>
              <div className={styles.weekday}>F</div>
              <div className={styles.weekday}>S</div>
            </div>

            {/* Calendar Cells - First Row (Previous Month) */}
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>26</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>27</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>28</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>29</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>30</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>31</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>1</div>
            </div>

            {/* Calendar Cells - Second Row */}
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>2</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>3</div>
              <div className={`${styles.event} ${styles.todo}`}>Meeting with John</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>4</div>
              <div className={`${styles.event} ${styles.todo}`}>Travel essential docs</div>
              <div className={`${styles.event} ${styles.inProgress}`}>Team meeting</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>5</div>
              <div className={`${styles.event} ${styles.completed}`}>Product Launch Plan</div>
              <div className={`${styles.event} ${styles.inProgress}`}>Coding session</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>6</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>7</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>8</div>
            </div>

            {/* Calendar Cells - Third Row */}
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>9</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>10</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>11</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>12</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>13</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>14</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>15</div>
            </div>

            {/* Calendar Cells - Fourth Row */}
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>16</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>17</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>18</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>19</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>20</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>21</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>22</div>
            </div>

            {/* Calendar Cells - Fifth Row */}
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>23</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>24</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>25</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>26</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>27</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>28</div>
            </div>
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>29</div>
            </div>

            {/* Calendar Cells - Sixth Row */}
            <div className={styles.dateCell}>
              <div className={styles.dateNumber}>30</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>1</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>2</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>3</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>4</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>5</div>
            </div>
            <div className={`${styles.dateCell} ${styles.otherMonth}`}>
              <div className={styles.dateNumber}>6</div>
            </div>
          </div>
        </div>

        {/* New Event Button */}
        <button className={styles.newEventButton}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>New Event</span>
        </button>
      </main>
    </>
  );
};

export default Events; 