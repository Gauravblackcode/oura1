import React, { FC, useEffect, useState } from 'react';
import GoalsService from '@/services/goals/goals.service';
import TasksService from '@/services/tasks/tasks.service';
import { EventService } from '@/services/event/event.service';
import { Task, Event } from 'types';

const DashboardContainer = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const goalsService = new GoalsService();
  const tasksService = new TasksService();
  const eventService = new EventService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch goals
        const goalsResponse = await goalsService.getGoals({
          pagination: {
            pageNo: 1,
            pageSize: 10
          }
        });
        if (goalsResponse?.goals?.data) {
          setGoals(goalsResponse.goals.data);
        }

        // Fetch tasks
        const tasksResponse = await tasksService.getTasks(undefined, undefined, {
          pageNo: 1,
          pageSize: 10
        });
        if (tasksResponse?.data) {
          setTasks(tasksResponse.data);
        }

        // Fetch events
        const eventsResponse = await eventService.getEvents(undefined, {
          pageNo: 1,
          pageSize: 10
        });
        if (eventsResponse?.data) {
          setEvents(eventsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginLeft: 30, marginTop: 30, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <img
            src="/images/OURA.1 - Primary Logo large canvas.png"
            width={50}
            height={55}
            alt="OURA.1 Logo"
          />
          <h1>Dashboard</h1>
        </div>

        {/* Goals Section */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {goals.map((goal, index) => (
            <div key={goal._id} style={{
              background: index % 2 === 0 ? 'var(--primary-default)' : 'var(--Colors-Secondary-400-base, #3F3F3F)',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.10)',
              borderRadius: 34,
              marginTop: 30,
              padding: 50,
              width: 300,
            }}>
              <h3 style={{ color: 'white', textAlign: 'left' }}>{goal.title}</h3>
              <p style={{ color: 'white' }}>Completion: {goal.totalTaskCount > 0 ? Math.round((goal.completedTaskCount / goal.totalTaskCount) * 100) : 0}%</p>
            </div>
          ))}
        </div>

        {/* Tasks and Events Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          {/* Tasks Section */}
          <div style={{
            background: 'var(--white-100)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '15px', color: 'var(--text-color-primary)' }}>Tasks</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {tasks.map(task => (
                <div key={task._id} style={{
                  padding: '12px',
                  borderBottom: '1px solid var(--grey-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ color: 'var(--text-color-primary)' }}>{task.title}</div>
                    {task.dueDate && (
                      <div style={{ fontSize: '0.9em', color: 'var(--text-color-secondary)' }}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <span style={{
                    color: task.status === 'COMPLETED' ? 'var(--green-400)' : 'var(--orange-400)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: task.status === 'COMPLETED' ? 'var(--green-100)' : 'var(--orange-100)'
                  }}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div style={{
            background: 'var(--white-100)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '15px', color: 'var(--text-color-primary)' }}>Events</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {events.map(event => {
                const startDate = new Date(event.scheduledStartsAt);
                const endDate = new Date(event.scheduledEndsAt);
                const isUpcoming = startDate > new Date();

                return (
                  <div key={event._id} style={{
                    padding: '12px',
                    borderBottom: '1px solid var(--grey-300)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: isUpcoming ? 'var(--blue-100)' : 'var(--grey-100)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{
                        fontSize: '0.8em',
                        fontWeight: 'bold',
                        color: isUpcoming ? 'var(--blue-400)' : 'var(--grey-400)'
                      }}>
                        {startDate.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div style={{
                        fontSize: '1.1em',
                        fontWeight: 'bold',
                        color: isUpcoming ? 'var(--blue-400)' : 'var(--grey-400)'
                      }}>
                        {startDate.getDate()}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        color: 'var(--text-color-primary)',
                        fontWeight: '500'
                      }}>
                        {event.title}
                      </div>
                      <div style={{
                        fontSize: '0.9em',
                        color: 'var(--text-color-secondary)',
                        marginTop: '4px'
                      }}>
                        {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span style={{
                      color: isUpcoming ? 'var(--blue-400)' : 'var(--grey-1000)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: isUpcoming ? 'var(--blue-100)' : 'var(--grey-100)',
                      fontSize: '0.9em'
                    }}>
                      {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
