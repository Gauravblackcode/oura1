import React from 'react';
import styles from '../goals.module.scss';

interface MarkdownToolbarProps {
    contentType: string;
    applyFormatting: (type: string, contentType: string) => void;
}

export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ contentType, applyFormatting }) => {
    return (
        <div className={styles.markdownToolbar}>
            <button
                type="button"
                className={`${styles.toolbarButton} ${styles.boldButton}`}
                onClick={() => applyFormatting('bold', contentType)}
                title="Bold"
            >B</button>
            <button
                type="button"
                className={`${styles.toolbarButton} ${styles.italicButton}`}
                onClick={() => applyFormatting('italic', contentType)}
                title="Italic"
            >I</button>
            <button
                type="button"
                className={`${styles.toolbarButton} ${styles.underlineButton}`}
                onClick={() => applyFormatting('underline', contentType)}
                title="Underline"
            >U</button>
            <span className={styles.toolbarDivider}></span>
            <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => applyFormatting('list', contentType)}
                title="Bullet List"
            >• List</button>
            <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => applyFormatting('numbered', contentType)}
                title="Numbered List"
            >1. Numbered</button>
            <span className={styles.toolbarDivider}></span>
            <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => applyFormatting('align', contentType)}
                title="Center Align"
            >≡ Align</button>
        </div>
    );
}; 