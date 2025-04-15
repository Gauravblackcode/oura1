import { NextPage } from 'next';
import Head from 'next/head';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import Navigation from '../components/navigation/Navigation';

const CalendarPage: NextPage = () => {
  // Get dates for today, yesterday, and tomorrow
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [events, setEvents] = useState([
    {
      title: 'Yesterday Meeting',
      start: yesterday.toISOString().split('T')[0] + 'T10:00:00',
      end: yesterday.toISOString().split('T')[0] + 'T11:00:00',
      backgroundColor: '#F3F6FF',
      borderColor: '#4C9AFF',
      textColor: '#1D1B20',
    },
    {
      title: 'Today Team Sync',
      start: today.toISOString().split('T')[0] + 'T14:00:00',
      end: today.toISOString().split('T')[0] + 'T15:00:00',
      backgroundColor: '#D24D21',
      borderColor: '#D24D21',
      textColor: 'white',
    },
    {
      title: 'Client Presentation',
      start: today.toISOString().split('T')[0] + 'T16:00:00',
      end: today.toISOString().split('T')[0] + 'T17:00:00',
      backgroundColor: '#D24D21',
      borderColor: '#D24D21',
      textColor: 'white',
    },
    {
      title: 'Tomorrow Planning',
      start: tomorrow.toISOString().split('T')[0] + 'T09:00:00',
      end: tomorrow.toISOString().split('T')[0] + 'T10:00:00',
      backgroundColor: '#F8FBFF',
      borderColor: '#4C9AFF',
      textColor: '#1D1B20',
    },
    {
      title: 'Project Review',
      start: tomorrow.toISOString().split('T')[0] + 'T11:00:00',
      end: tomorrow.toISOString().split('T')[0] + 'T12:00:00',
      backgroundColor: '#F8FBFF',
      borderColor: '#4C9AFF',
      textColor: '#1D1B20',
    },
  ]);

  return (
    <>
      <Head>
        <title>Calendar | Dashboard</title>
        <style jsx global>{`
          :root {
            --fc-button-bg-color: #D24D21;
            --fc-button-border-color: #D24D21;
            --fc-button-hover-bg-color: #B23D11;
            --fc-button-hover-border-color: #B23D11;
            --fc-button-active-bg-color: #B23D11;
            --fc-button-active-border-color: #B23D11;
            --fc-button-disabled-bg-color: #F3F6FF;
            --fc-button-disabled-border-color: #E5E7EB;
            --fc-button-disabled-color: #ADAEBC;
            --fc-today-bg-color: #F8FBFF;
            --fc-event-bg-color: #D24D21;
            --fc-event-border-color: #D24D21;
            --fc-event-text-color: white;
            --fc-neutral-bg-color: white;
            --fc-border-color: #E5E7EB;
            --fc-page-bg-color: white;
            --fc-neutral-text-color: #1D1B20;
            --fc-list-event-hover-bg-color: #F8FBFF;
          }

          .fc {
            font-family: var(--font-primary);
          }

          .fc-button {
            border-radius: 100px;
            font-weight: 500;
            font-size: 14px;
            padding: 8px 16px;
            text-transform: none;
          }

          .fc-button-primary {
            background-color: var(--fc-button-bg-color) !important;
            border-color: var(--fc-button-border-color) !important;
          }

          .fc-button-primary:hover {
            background-color: var(--fc-button-hover-bg-color) !important;
            border-color: var(--fc-button-hover-border-color) !important;
          }

          .fc-button-primary:disabled {
            background-color: var(--fc-button-disabled-bg-color) !important;
            border-color: var(--fc-button-disabled-border-color) !important;
            color: var(--fc-button-disabled-color) !important;
          }

          .fc-today-button {
            background-color: var(--fc-button-bg-color) !important;
            border-color: var(--fc-button-border-color) !important;
          }

          .fc-today-button:hover {
            background-color: var(--fc-button-hover-bg-color) !important;
            border-color: var(--fc-button-hover-border-color) !important;
          }

          .fc-day-today {
            background-color: var(--fc-today-bg-color) !important;
          }

          .fc-event {
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }

          .fc-event-title {
            font-weight: 500;
          }

          .fc-col-header-cell {
            background-color: #F9FAFB;
            padding: 12px 0;
          }

          .fc-col-header-cell-cushion {
            color: #1D1B20;
            font-weight: 600;
            font-size: 14px;
          }

          .fc-daygrid-day-number {
            color: #1D1B20;
            font-weight: 500;
            font-size: 14px;
          }

          .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
            color: #D24D21;
            font-weight: 600;
          }

          .fc-toolbar-title {
            font-size: 20px;
            font-weight: 600;
            color: #1D1B20;
          }

          .fc-daygrid-day {
            border-color: #E5E7EB;
          }

          .fc-daygrid-day.fc-day-today {
            border-color: #D24D21;
          }
        `}</style>
      </Head>
      <main>
        <div style={{
          height: "1024px",
          background: "white",
          overflow: "hidden",
          borderRadius: "8px",
          outline: "2px #CED4DA solid",
          outlineOffset: "-2px",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "inline-flex",
          width: "100%"
        }}>
          <div style={{
            width: "100%",
            height: "1024px",
            position: "relative",
            background: "rgba(0, 0, 0, 0)"
          }}>
            <div style={{
              width: "100%",
              height: "1024px",
              left: "0px",
              top: "0px",
              display: "flex",
              position: "relative",
              background: "#F9FAFB"
            }}>
              {/* Sidebar */}
              <Navigation />

              {/* Main Content */}
              <div style={{
                padding: "30px",
                width: "100%"
              }}>
                {/* Calendar */}
                <div style={{
                  background: "white",
                  borderRadius: "10px",
                  padding: "24px",
                  height: "calc(100vh - 180px)"
                }}>
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    height="100%"
                    nowIndicator={true}
                    dayCellClassNames="calendar-day"
                    eventClassNames="calendar-event"
                    eventTimeFormat={{
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CalendarPage; 