import React from 'react';
import Image from 'next/image';
import styles from '../goals.module.scss';
import activityLogIcon from '../../../assets/images/quill_activity.svg';
export const ActivityLog: React.FC = () => {
    return (
        <>
            <div className={styles.activityLogContainer}>
                <Image src={activityLogIcon} alt="Activity Log" width={24} height={24} />
                <span className={styles.activityLogTitle}>Activity Log</span>
            </div>
        </>
    );
}; 