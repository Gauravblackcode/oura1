import Navigation from '@/components/navigation/Navigation';
import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Dashboard from './dashboard';

const ChatsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chats | Oura 1</title>
        <meta name="description" content="Chat interface for Oura 1" />
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
                // marginLeft: "256px",
                padding: "30px",
                width: "100%"
              }}>
                <Dashboard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatsPage; 