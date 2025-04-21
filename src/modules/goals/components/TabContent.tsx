import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { KeyedMutator } from 'swr';
import styles from '../goals.module.scss';
import Image from 'next/image';
import PenIcon from '../../../assets/images/anime.svg';
import NotesService from '@/services/notes/notes.service';
import TasksService from '@/services/tasks/tasks.service';
import { EventService } from '@/services/event/event.service';
import { TaskPriority, TaskStatus } from '@/types/task.types';

// Dynamically import the editor to avoid SSR issues
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>
});

interface TabContentProps {
    activeTab: string;
    noteContent: string;
    taskContent: string;
    eventContent: string;
    setNoteContent: (content: string) => void;
    setTaskContent: (content: string) => void;
    setEventContent: (content: string) => void;
    applyFormatting: (type: string, contentType: string) => void;
    goalId: string;  // Add goalId prop
    onSave?: () => void;  // Optional callback after successful save
    mutateNotes: KeyedMutator<any>;
    mutateTasks: KeyedMutator<any>;
    mutateEvents: KeyedMutator<any>;
}

export const TabContent: React.FC<TabContentProps> = ({
    activeTab,
    noteContent,
    taskContent,
    eventContent,
    setNoteContent,
    setTaskContent,
    setEventContent,
    applyFormatting,
    goalId,
    onSave,
    mutateNotes,
    mutateTasks,
    mutateEvents
}) => {
    // Initialize markdown parser on client side only
    const [mdParser, setMdParser] = useState<any>(null);

    // Initialize services
    const notesService = new NotesService();
    const tasksService = new TasksService();
    const eventService = new EventService();

    // State for date/time inputs in events tab
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');

    // State for task inputs
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState<TaskPriority>(TaskPriority.Medium);

    useEffect(() => {
        // Initialize markdown-it parser on client side
        const loadDependencies = async () => {
            const MarkdownIt = (await import('markdown-it')).default;
            setMdParser(new MarkdownIt());

            // Import CSS on client side only
            await import('react-markdown-editor-lite/lib/index.css');
        };

        loadDependencies();
    }, []);

    // Handle editor change
    const handleEditorChange = (data: { text: string, html: string }, contentType: string) => {
        if (contentType === 'notes') {
            setNoteContent(data.text);
        } else if (contentType === 'tasks') {
            setTaskContent(data.text);
        } else if (contentType === 'events') {
            setEventContent(data.text);
        }
    };

    // Editor configuration to allow editing
    const editorConfig = {
        view: {
            menu: true,
            md: true,  // Show markdown editing area
            html: true, // Show preview
            fullScreen: true,
            hideMenu: false,
        },
        canView: {
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
            hideMenu: true,
        }
    };

    // If markdown parser is not loaded yet, show loading
    if (!mdParser) {
        return <div>Loading editor...</div>;
    }

    const handleSave = async () => {
        console.log('handleSave', activeTab, noteContent, taskContent, eventContent);
        try {
            let success = false;
            if (activeTab === "notes" && noteContent.trim()) {
                const response = await notesService.createNote({
                    createNoteDto: {
                        title: noteContent.split('\n')[0] || 'New Note',
                        content: noteContent.trim(),
                        goalId: goalId
                    }
                });
                if (response?._id) {
                    setNoteContent('');
                    success = true;
                    await mutateNotes();
                }
            }
            else if (activeTab === "tasks" && taskContent.trim()) {
                const response = await tasksService.createTask({
                    title: taskContent.split('\n')[0] || 'New Task',
                    description: taskContent.trim(),
                    goalId: goalId,
                    dueDate: taskDueDate || undefined,
                    priority: taskPriority,
                    status: TaskStatus.Todo
                });
                if (response) {
                    setTaskContent('');
                    setTaskDueDate('');
                    success = true;
                    await mutateTasks();
                }
            }
            else if (activeTab === "events" && eventContent.trim()) {
                const startDateTime = `${eventStartDate}T${eventStartTime}:00`;
                const endDateTime = `${eventEndDate}T${eventEndTime}:00`;

                const response = await eventService.createEvent({
                    title: eventTitle || eventContent.split('\n')[0] || 'New Event',
                    description: eventDescription || eventContent,
                    goalId: goalId,
                    scheduledStartsAt: startDateTime,
                    scheduledEndsAt: endDateTime
                });

                if (response?._id) {
                    setEventContent('');
                    setEventTitle('');
                    setEventDescription('');
                    setEventStartDate('');
                    setEventStartTime('');
                    setEventEndDate('');
                    setEventEndTime('');
                    success = true;
                    await mutateEvents();
                }
            }

            // Call the onSave callback if provided and save was successful
            if (success) {
                onSave?.();
            }
        } catch (error) {
            console.error('Failed to save:', error);
            // You might want to show an error message to the user here
        }
    };

    if (activeTab === "notes") {
        return (
            <>
                <div className={styles.contentBox}>
                    <MdEditor
                        value={noteContent}
                        style={{ height: '200px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={data => setNoteContent(data.text)}
                        placeholder="Write your note here..."
                    />
                    <div className={styles.contentFooter}>
                        <div className={styles.tagIndicator}>
                            <span className={styles.tagDot}></span>
                            <span>Personal</span>
                        </div>
                        <button
                            type="button"
                            style={{ cursor: 'pointer', backgroundColor: '#D24D21', }}
                            className={styles.saveButton}
                            onClick={handleSave}
                            disabled={!noteContent.trim()}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Generated by Aime */}
                <div className={styles.aimeIndicator}>
                    <span>
                        <Image
                            src={PenIcon}
                            alt="Pen icon"
                            width={16}
                            height={16}
                            style={{ marginRight: "4px", verticalAlign: "middle" }}
                        />
                        Generated by Aime
                    </span>
                </div>

                {/* New Note Button */}
                <div className={styles.newItemButton}>
                    <span className={styles.newItemIcon}>+</span>
                    <span className={styles.newItemText}>New Note</span>
                </div>
            </>
        );
    }

    if (activeTab === "tasks") {
        return (
            <>
                <div className={styles.contentBox}>
                    <MdEditor
                        value={taskContent}
                        style={{ height: '200px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={data => setTaskContent(data.text)}
                        placeholder="Add your task details here..."
                    />
                    <div className={styles.contentFooter}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <select
                                value={taskPriority}
                                onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
                                style={{
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #CED4DA"
                                }}
                            >
                                <option value={TaskPriority.Low}>Low Priority</option>
                                <option value={TaskPriority.Medium}>Medium Priority</option>
                                <option value={TaskPriority.High}>High Priority</option>
                            </select>
                            <input
                                type="date"
                                value={taskDueDate}
                                onChange={(e) => setTaskDueDate(e.target.value)}
                                style={{
                                    padding: "5px",
                                    borderRadius: "4px",
                                    border: "1px solid #CED4DA"
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            className={styles.saveButton}
                            onClick={handleSave}
                            disabled={!taskContent.trim()}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* New Task Button */}
                <div className={styles.newItemButton}>
                    <span className={styles.newItemIcon}>+</span>
                    <span className={styles.newItemText}>New Task</span>
                </div>
            </>
        );
    }

    if (activeTab === "events") {
        return (
            <>
                <div className={styles.contentBox}>
                    <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="Event Title"
                        className={styles.eventInput}
                    />
                    <MdEditor
                        value={eventContent}
                        style={{ height: '200px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={data => {
                            setEventContent(data.text);
                            setEventDescription(data.text);
                        }}
                        placeholder="Add your event details here..."
                    />
                    <div className={styles.contentFooter}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <div>
                                <label>Start:</label>
                                <input
                                    type="date"
                                    value={eventStartDate}
                                    onChange={(e) => setEventStartDate(e.target.value)}
                                    style={{
                                        padding: "5px",
                                        borderRadius: "4px",
                                        border: "1px solid #CED4DA"
                                    }}
                                />
                                <input
                                    type="time"
                                    value={eventStartTime}
                                    onChange={(e) => setEventStartTime(e.target.value)}
                                    style={{
                                        padding: "5px",
                                        borderRadius: "4px",
                                        border: "1px solid #CED4DA"
                                    }}
                                />
                            </div>
                            <div>
                                <label>End:</label>
                                <input
                                    type="date"
                                    value={eventEndDate}
                                    onChange={(e) => setEventEndDate(e.target.value)}
                                    style={{
                                        padding: "5px",
                                        borderRadius: "4px",
                                        border: "1px solid #CED4DA"
                                    }}
                                />
                                <input
                                    type="time"
                                    value={eventEndTime}
                                    onChange={(e) => setEventEndTime(e.target.value)}
                                    style={{
                                        padding: "5px",
                                        borderRadius: "4px",
                                        border: "1px solid #CED4DA"
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className={styles.saveButton}
                            onClick={handleSave}
                            disabled={!eventContent.trim() || !eventStartDate || !eventStartTime || !eventEndDate || !eventEndTime}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* New Event Button */}
                <div className={styles.newItemButton}>
                    <span className={styles.newItemIcon}>+</span>
                    <span className={styles.newItemText}>New Event</span>
                </div>
            </>
        );
    }

    return null;
};