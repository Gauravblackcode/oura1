import React from 'react';

interface TaskCardProps {
  title: string;
  dueDate: string;
  duration: string;
  icon: React.ReactNode;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, dueDate, duration, icon }) => {
  return (
    <div style={{ width: "100%", height: 132, position: 'relative', background: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)', borderRadius: 12 }}>
      <div style={{ width: "100%", display: 'flex', justifyContent: "space-between", alignItems: "center", height: "50px", padding: "20px" }}>
        <div>
          {icon}
        </div>
        <div style={{ color: '#3F3F3F', fontSize: 14, fontFamily: 'var(--font-primary)', fontWeight: '500', lineHeight: 20 }}>
          {title}
        </div>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 10.5C5.17157 10.5 4.5 11.1716 4.5 12C4.5 12.8284 5.17157 13.5 6 13.5C6.82843 13.5 7.5 12.8284 7.5 12C7.5 11.1716 6.82843 10.5 6 10.5Z" fill="#6C757D" />
            <path d="M10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12Z" fill="#6C757D" />
            <path d="M16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z" fill="#6C757D" />
          </svg>
        </div>
      </div>

      <div style={{ width: "100%", display: 'flex', justifyContent: "space-between", alignItems: "center", height: "50px", padding: "20px" }}>
        <div></div>
        <div style={{ color: '#3F3F3F', fontSize: 14, fontFamily: 'var(--font-primary)', fontWeight: '500', lineHeight: 20, textAlign: 'left' }}>
          Due Date: {dueDate}
        </div>
        <div>
          <div style={{ width: 59, height: 20, background: 'rgba(210, 77, 33, 0.10)', overflow: 'hidden', borderRadius: 8, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#E78565', fontSize: 10, fontFamily: 'var(--font-primary)', fontWeight: '500', lineHeight: 14, wordWrap: 'break-word' }}>
              {duration}
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "98%", height: 0, left: 11, top: 98, position: 'absolute', outline: '1px #E0E0E0 solid', outlineOffset: '-0.50px' }}></div>
    </div>
  );
};

export default TaskCard; 