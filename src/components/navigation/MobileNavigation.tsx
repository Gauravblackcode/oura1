import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './mobile-navigation.module.scss';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteIcon from '@mui/icons-material/Note';
import EventIcon from '@mui/icons-material/Event';

const navigationItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { name: "Chats", icon: <ChatIcon />, path: "/chats" },
    { name: "Goals", icon: <AssignmentIcon />, path: "/goals" },
    { name: "Notes", icon: <NoteIcon />, path: "/notes" },
    { name: "Calendar", icon: <EventIcon />, path: "/events" },
];

const MobileNavigation: React.FC = () => {
    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <div className={styles.mobileNav}>
            {navigationItems.map((item) => (
                <Link href={item.path} key={item.name} className={styles.navItem}>
                    <div className={`${styles.navButton} ${currentPath === item.path ? styles.active : ''}`}>
                        <div className={styles.icon}>{item.icon}</div>
                        <span className={styles.label}>{item.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MobileNavigation; 