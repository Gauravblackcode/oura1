import { NextPage } from 'next';
import Head from 'next/head';

const NotesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notes | Oura 1</title>
        <meta name="description" content="Notes management for Oura 1" />
      </Head>
      <main>
        <div style={{
          padding: '24px',
          height: '100vh',
          background: '#F9FAFB'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 600,
              fontFamily: 'var(--font-primary)'
            }}>
              Notes
            </h1>
            <button style={{
              background: '#D24D21',
              color: 'white',
              border: 'none',
              borderRadius: '100px',
              padding: '10px 24px',
              fontSize: '14px',
              fontFamily: 'var(--font-primary)',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              + Add New Note
            </button>
          </div>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {/* Notes list will go here */}
            <p style={{
              color: '#6B7280',
              fontFamily: 'var(--font-primary)',
              textAlign: 'center'
            }}>
              No notes yet. Add your first note!
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotesPage; 