import { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import TaskCard from '../components/tasks/TaskCard';

const TasksPage: NextPage = () => {
  const tasks = [
    {
      title: "Review designs with client",
      dueDate: "06 January 2025",
      duration: "30 mins",
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2047 24V21.0533L19.3153 13.9773C19.4469 13.8618 19.5825 13.7773 19.722 13.724C19.8616 13.6707 20.0016 13.6431 20.142 13.6413C20.2949 13.6413 20.4451 13.6698 20.5927 13.7267C20.7393 13.7844 20.8731 13.8707 20.994 13.9853L22.2273 15.244C22.3367 15.3756 22.4202 15.5124 22.478 15.6547C22.5349 15.796 22.5633 15.9378 22.5633 16.08C22.5633 16.2222 22.5362 16.3653 22.482 16.5093C22.4278 16.6533 22.3433 16.7911 22.2287 16.9227L15.15 24H12.2047ZM13.3847 22.8213H14.6513L19.274 18.1893L18.674 17.5307L18.0407 16.904L13.3833 21.5547L13.3847 22.8213ZM2.81935 24C2.20513 24 1.69268 23.7947 1.28202 23.384C0.871349 22.9733 0.666016 22.4609 0.666016 21.8467V2.15333C0.666016 1.54 0.871793 1.028 1.28335 0.617333C1.6949 0.206667 2.20735 0.000888889 2.82068 0H13.3327L19.3327 6V9.46133H17.9993V6.66667H12.666V1.33333H2.82068C2.61535 1.33333 2.4269 1.41867 2.25535 1.58933C2.08379 1.76 1.99846 1.948 1.99935 2.15333V21.8467C1.99935 22.0511 2.08468 22.2391 2.25535 22.4107C2.42602 22.5822 2.61402 22.6676 2.81935 22.6667H9.02468V24H2.81935ZM18.6727 17.5307L18.0407 16.904L19.274 18.1893L18.6727 17.5307Z" fill="#3F3F3F" />
        </svg>
      )
    },
    {
      title: "Team standup meeting",
      dueDate: "07 January 2025",
      duration: "1 hour",
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2047 24V21.0533L19.3153 13.9773C19.4469 13.8618 19.5825 13.7773 19.722 13.724C19.8616 13.6707 20.0016 13.6431 20.142 13.6413C20.2949 13.6413 20.4451 13.6698 20.5927 13.7267C20.7393 13.7844 20.8731 13.8707 20.994 13.9853L22.2273 15.244C22.3367 15.3756 22.4202 15.5124 22.478 15.6547C22.5349 15.796 22.5633 15.9378 22.5633 16.08C22.5633 16.2222 22.5362 16.3653 22.482 16.5093C22.4278 16.6533 22.3433 16.7911 22.2287 16.9227L15.15 24H12.2047ZM13.3847 22.8213H14.6513L19.274 18.1893L18.674 17.5307L18.0407 16.904L13.3833 21.5547L13.3847 22.8213ZM2.81935 24C2.20513 24 1.69268 23.7947 1.28202 23.384C0.871349 22.9733 0.666016 22.4609 0.666016 21.8467V2.15333C0.666016 1.54 0.871793 1.028 1.28335 0.617333C1.6949 0.206667 2.20735 0.000888889 2.82068 0H13.3327L19.3327 6V9.46133H17.9993V6.66667H12.666V1.33333H2.82068C2.61535 1.33333 2.4269 1.41867 2.25535 1.58933C2.08379 1.76 1.99846 1.948 1.99935 2.15333V21.8467C1.99935 22.0511 2.08468 22.2391 2.25535 22.4107C2.42602 22.5822 2.61402 22.6676 2.81935 22.6667H9.02468V24H2.81935ZM18.6727 17.5307L18.0407 16.904L19.274 18.1893L18.6727 17.5307Z" fill="#3F3F3F" />
        </svg>
      )
    },
    {
      title: "Code review session",
      dueDate: "08 January 2025",
      duration: "45 mins",
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2047 24V21.0533L19.3153 13.9773C19.4469 13.8618 19.5825 13.7773 19.722 13.724C19.8616 13.6707 20.0016 13.6431 20.142 13.6413C20.2949 13.6413 20.4451 13.6698 20.5927 13.7267C20.7393 13.7844 20.8731 13.8707 20.994 13.9853L22.2273 15.244C22.3367 15.3756 22.4202 15.5124 22.478 15.6547C22.5349 15.796 22.5633 15.9378 22.5633 16.08C22.5633 16.2222 22.5362 16.3653 22.482 16.5093C22.4278 16.6533 22.3433 16.7911 22.2287 16.9227L15.15 24H12.2047ZM13.3847 22.8213H14.6513L19.274 18.1893L18.674 17.5307L18.0407 16.904L13.3833 21.5547L13.3847 22.8213ZM2.81935 24C2.20513 24 1.69268 23.7947 1.28202 23.384C0.871349 22.9733 0.666016 22.4609 0.666016 21.8467V2.15333C0.666016 1.54 0.871793 1.028 1.28335 0.617333C1.6949 0.206667 2.20735 0.000888889 2.82068 0H13.3327L19.3327 6V9.46133H17.9993V6.66667H12.666V1.33333H2.82068C2.61535 1.33333 2.4269 1.41867 2.25535 1.58933C2.08379 1.76 1.99846 1.948 1.99935 2.15333V21.8467C1.99935 22.0511 2.08468 22.2391 2.25535 22.4107C2.42602 22.5822 2.61402 22.6676 2.81935 22.6667H9.02468V24H2.81935ZM18.6727 17.5307L18.0407 16.904L19.274 18.1893L18.6727 17.5307Z" fill="#3F3F3F" />
        </svg>
      )
    },
    {
      title: "Project planning",
      dueDate: "09 January 2025",
      duration: "2 hours",
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2047 24V21.0533L19.3153 13.9773C19.4469 13.8618 19.5825 13.7773 19.722 13.724C19.8616 13.6707 20.0016 13.6431 20.142 13.6413C20.2949 13.6413 20.4451 13.6698 20.5927 13.7267C20.7393 13.7844 20.8731 13.8707 20.994 13.9853L22.2273 15.244C22.3367 15.3756 22.4202 15.5124 22.478 15.6547C22.5349 15.796 22.5633 15.9378 22.5633 16.08C22.5633 16.2222 22.5362 16.3653 22.482 16.5093C22.4278 16.6533 22.3433 16.7911 22.2287 16.9227L15.15 24H12.2047ZM13.3847 22.8213H14.6513L19.274 18.1893L18.674 17.5307L18.0407 16.904L13.3833 21.5547L13.3847 22.8213ZM2.81935 24C2.20513 24 1.69268 23.7947 1.28202 23.384C0.871349 22.9733 0.666016 22.4609 0.666016 21.8467V2.15333C0.666016 1.54 0.871793 1.028 1.28335 0.617333C1.6949 0.206667 2.20735 0.000888889 2.82068 0H13.3327L19.3327 6V9.46133H17.9993V6.66667H12.666V1.33333H2.82068C2.61535 1.33333 2.4269 1.41867 2.25535 1.58933C2.08379 1.76 1.99846 1.948 1.99935 2.15333V21.8467C1.99935 22.0511 2.08468 22.2391 2.25535 22.4107C2.42602 22.5822 2.61402 22.6676 2.81935 22.6667H9.02468V24H2.81935ZM18.6727 17.5307L18.0407 16.904L19.274 18.1893L18.6727 17.5307Z" fill="#3F3F3F" />
        </svg>
      )
    },
    {
      title: "Client demo",
      dueDate: "10 January 2025",
      duration: "1.5 hours",
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2047 24V21.0533L19.3153 13.9773C19.4469 13.8618 19.5825 13.7773 19.722 13.724C19.8616 13.6707 20.0016 13.6431 20.142 13.6413C20.2949 13.6413 20.4451 13.6698 20.5927 13.7267C20.7393 13.7844 20.8731 13.8707 20.994 13.9853L22.2273 15.244C22.3367 15.3756 22.4202 15.5124 22.478 15.6547C22.5349 15.796 22.5633 15.9378 22.5633 16.08C22.5633 16.2222 22.5362 16.3653 22.482 16.5093C22.4278 16.6533 22.3433 16.7911 22.2287 16.9227L15.15 24H12.2047ZM13.3847 22.8213H14.6513L19.274 18.1893L18.674 17.5307L18.0407 16.904L13.3833 21.5547L13.3847 22.8213ZM2.81935 24C2.20513 24 1.69268 23.7947 1.28202 23.384C0.871349 22.9733 0.666016 22.4609 0.666016 21.8467V2.15333C0.666016 1.54 0.871793 1.028 1.28335 0.617333C1.6949 0.206667 2.20735 0.000888889 2.82068 0H13.3327L19.3327 6V9.46133H17.9993V6.66667H12.666V1.33333H2.82068C2.61535 1.33333 2.4269 1.41867 2.25535 1.58933C2.08379 1.76 1.99846 1.948 1.99935 2.15333V21.8467C1.99935 22.0511 2.08468 22.2391 2.25535 22.4107C2.42602 22.5822 2.61402 22.6676 2.81935 22.6667H9.02468V24H2.81935ZM18.6727 17.5307L18.0407 16.904L19.274 18.1893L18.6727 17.5307Z" fill="#3F3F3F" />
        </svg>
      )
    },
    {
      title: "Sprint retrospective",
      dueDate: "11 January 2025",
      duration: "1 hour",
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2047 24V21.0533L19.3153 13.9773C19.4469 13.8618 19.5825 13.7773 19.722 13.724C19.8616 13.6707 20.0016 13.6431 20.142 13.6413C20.2949 13.6413 20.4451 13.6698 20.5927 13.7267C20.7393 13.7844 20.8731 13.8707 20.994 13.9853L22.2273 15.244C22.3367 15.3756 22.4202 15.5124 22.478 15.6547C22.5349 15.796 22.5633 15.9378 22.5633 16.08C22.5633 16.2222 22.5362 16.3653 22.482 16.5093C22.4278 16.6533 22.3433 16.7911 22.2287 16.9227L15.15 24H12.2047ZM13.3847 22.8213H14.6513L19.274 18.1893L18.674 17.5307L18.0407 16.904L13.3833 21.5547L13.3847 22.8213ZM2.81935 24C2.20513 24 1.69268 23.7947 1.28202 23.384C0.871349 22.9733 0.666016 22.4609 0.666016 21.8467V2.15333C0.666016 1.54 0.871793 1.028 1.28335 0.617333C1.6949 0.206667 2.20735 0.000888889 2.82068 0H13.3327L19.3327 6V9.46133H17.9993V6.66667H12.666V1.33333H2.82068C2.61535 1.33333 2.4269 1.41867 2.25535 1.58933C2.08379 1.76 1.99846 1.948 1.99935 2.15333V21.8467C1.99935 22.0511 2.08468 22.2391 2.25535 22.4107C2.42602 22.5822 2.61402 22.6676 2.81935 22.6667H9.02468V24H2.81935ZM18.6727 17.5307L18.0407 16.904L19.274 18.1893L18.6727 17.5307Z" fill="#3F3F3F" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>Tasks | Oura 1</title>
        <meta name="description" content="Manage your tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
                {/* Header */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px"
                }}>
                  <h1 style={{
                    color: "#1F2937",
                    fontSize: "24px",
                    fontFamily: "var(--font-primary)",
                    fontWeight: 700,
                    lineHeight: "32px"
                  }}>
                    Tasks
                  </h1>
                  <button style={{
                    background: "#D24D21",
                    color: "white",
                    border: "none",
                    borderRadius: "100px",
                    padding: "10px 24px",
                    fontSize: "14px",
                    fontFamily: "var(--font-primary)",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}>
                    + Add New Task
                  </button>
                </div>

                {/* Top Navigation Filters */}
                <div style={{ width: "100%", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex', marginBottom: "24px" }}>
                  <h1 style={{ color: 'var(--Colors-Secondary-400-base, #3F3F3F)', fontSize: 16, fontFamily: 'var(--font-primary)', margin: "10px" }}>Today's Tasks</h1>
                  
                  <div style={{ justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                    <div data-selected="False" data-show-icon="False" data-state="Enabled" data-style="Outlined" style={{ background: 'var(--Colors-Primary-200, #E78565)', overflow: 'hidden', borderRadius: 8, outline: '1px var(--Colors-Primary-200, #E78565) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <div style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 4, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex' }}>
                        <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Colors-Neutral-100-base, #F5F3EB)', fontSize: 14, fontFamily: 'var(--font-primary)', lineHeight: 1.8, }}>Work</div>
                      </div>
                    </div>
                    <div data-selected="False" data-show-icon="False" data-state="Enabled" data-style="Outlined" style={{ width: 86, height: 28, overflow: 'hidden', borderRadius: 8, outline: '1px var(--Colors-Primary-200, #E78565) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <div style={{ height: 32, paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex' }}>
                        <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Colors-Primary-200, #E78565)', fontSize: 14, fontFamily: 'var(--font-primary)', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word' }}>Learning</div>
                      </div>
                    </div>
                    <div data-selected="False" data-show-icon="False" data-state="Enabled" data-style="Outlined" style={{ width: 86, height: 28, overflow: 'hidden', borderRadius: 8, outline: '1px var(--Colors-Primary-200, #E78565) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <div style={{ height: 32, paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex' }}>
                        <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Colors-Primary-200, #E78565)', fontSize: 14, fontFamily: 'var(--font-primary)', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word' }}>Personal</div>
                      </div>
                    </div>
                    <div data-selected="False" data-show-icon="False" data-state="Enabled" data-style="Outlined" style={{ width: 86, height: 28, overflow: 'hidden', borderRadius: 8, outline: '1px var(--Colors-Primary-200, #E78565) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <div style={{ height: 32, paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex' }}>
                        <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--Colors-Primary-200, #E78565)', fontSize: 14, fontFamily: 'var(--font-primary)', fontWeight: '500', lineHeight: 20, wordWrap: 'break-word' }}>Others</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tasks Grid */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px"
                }}>
                  {tasks.map((task, index) => (
                    <TaskCard
                      key={index}
                      title={task.title}
                      dueDate={task.dueDate}
                      duration={task.duration}
                      icon={task.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TasksPage;

