import React from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import styles from './NoteDetail.module.scss';

interface NoteDetailProps {
    note: {
        _id: string;
        content: string;
        createdAt: string;
        tags?: string[];
        isGeneratedByAime?: boolean;
    };
    onClose: () => void;
    goalId: string;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note, onClose, goalId }) => {
    const router = useRouter();

    return (
        <div className={styles.noteDetailContainer}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className={styles.title}>Plan Europe trip</h1>
            </div>

            <div className={styles.breadcrumbs}>
                <span onClick={() => router.push('/home')}>Home</span>
                <span className={styles.separator}>/</span>
                <span onClick={() => router.push('/goals')}>Goals</span>
                <span className={styles.separator}>/</span>
                <span onClick={() => router.push(`/goals/${goalId}`)}>Goals Detail</span>
                <span className={styles.separator}>/</span>
                <span className={styles.current}>Notes Detail</span>
            </div>

            <div className={styles.noteContent}>
                <h2 className={styles.sectionTitle}>Initial Plan</h2>
                <div className={styles.content}>
                    {note.content}
                </div>

                <div className={styles.formatToolbar}>
                    <button className={styles.formatButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className={styles.formatButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4h8a4 4 0 014 4v12a1 1 0 01-1.7.7L12 16l-4.3 4.7A1 1 0 016 20V4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className={styles.formatButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className={styles.formatButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.tagContainer}>
                    <div className={styles.tag}>
                        <span className={styles.personalIcon}>⚪</span>
                        Personal
                    </div>
                    <div className={styles.tag}>
                        <span className={styles.travelIcon}>🟡</span>
                        Travel
                    </div>
                    <button className={styles.addTagButton}>
                        <span>+</span> Add tag
                    </button>
                </div>

                <div className={styles.aimeAssist}>
                    <div className={styles.aimeIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#D24D21" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="#D24D21" />
                            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span>Aime Assist</span>
                </div>

                <div className={styles.metaInfo}>
                    <div className={styles.createdInfo}>
                        Created on: {moment(note.createdAt).format('DD MMM YYYY')}
                    </div>
                    {note.isGeneratedByAime && (
                        <div className={styles.generatedInfo}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#22C55E" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fill="#22C55E" fillOpacity="0.2" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#22C55E" strokeWidth="2" />
                                <path d="M8 12l3 3 5-6" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Generated by Aime
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.linkedSections}>
                <div className={styles.linkedSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Linked Tasks
                        </div>
                        <div className={styles.sectionActions}>
                            <button className={styles.collapseButton}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className={styles.addButton}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.taskItem}>
                        <div className={styles.taskContent}>
                            <div className={styles.taskTitle}>Research about the cities</div>
                            <div className={styles.taskMeta}>
                                <div className={styles.dueDate}>Due Date: 06 January 2025</div>
                                <div className={styles.frequency}>Once</div>
                            </div>
                            <div className={styles.taskTag}>
                                <span className={styles.personalIcon}>⚪</span>
                                Personal
                            </div>
                        </div>
                        <button className={styles.moreButton}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.linkedSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitle}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Linked Events
                        </div>
                        <div className={styles.sectionActions}>
                            <button className={styles.collapseButton}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className={styles.addButton}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.activityLog}>
                <div className={styles.activityHeader}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Activity Log
                </div>
            </div>
        </div>
    );
};

export default NoteDetail; 