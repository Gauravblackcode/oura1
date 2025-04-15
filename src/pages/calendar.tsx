import { NextPage } from 'next';
import Head from 'next/head';
// import { Calendar } from '@mui/x-date-pickers/Calendar';

const CalendarPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Calendar | Oura 1</title>
        <meta name="description" content="Calendar view for Oura 1" />
      </Head>
      <main>
        <div style={{
          padding: '24px',
          height: '100vh',
          background: '#F9FAFB'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            marginBottom: '24px',
            fontFamily: 'var(--font-primary)'
          }}>
            Calendar
          </h1>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {/* <Calendar /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default CalendarPage; 