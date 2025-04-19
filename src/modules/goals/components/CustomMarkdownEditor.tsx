import React from 'react';
import dynamic from 'next/dynamic';

// Use react-textarea-autosize for a simple expandable textarea
const TextareaAutosize = dynamic(() => import('react-textarea-autosize'), { ssr: false });

interface CustomMarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    height?: string;
    placeholder?: string;
    visible?: boolean;
}

const CustomMarkdownEditor: React.FC<CustomMarkdownEditorProps> = ({
    value,
    onChange,
    height = '200px',
    placeholder,
    visible = true,
}) => {
    // Calculate approximate number of rows based on height
    // Assuming each row is roughly 20px tall
    const minRows = Math.max(3, parseInt(height) / 20);

    return (
        <div style={{ display: visible ? 'block' : 'none' }}>
            <div className="markdown-editor">
                <div className="toolbar">
                    <button type="button" onClick={() => onChange(value + '**bold**')}>B</button>
                    <button type="button" onClick={() => onChange(value + '*italic*')}>I</button>
                    <button type="button" onClick={() => onChange(value + '# Heading')}>H</button>
                    <button type="button" onClick={() => onChange(value + '- List item')}>•</button>
                    <button type="button" onClick={() => onChange(value + '1. Numbered item')}>1.</button>
                    <button type="button" onClick={() => onChange(value + '[Link](https://example.com)')}>Link</button>
                </div>
                <TextareaAutosize
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    minRows={minRows}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        resize: 'vertical'
                    }}
                />
            </div>
            <style jsx>{`
                .markdown-editor {
                    border: 1px solid #e1e4e8;
                    border-radius: 6px;
                    overflow: hidden;
                }
                .toolbar {
                    display: flex;
                    padding: 8px;
                    background-color: #f6f8fa;
                    border-bottom: 1px solid #e1e4e8;
                }
                .toolbar button {
                    margin-right: 8px;
                    padding: 4px 8px;
                    background: white;
                    border: 1px solid #d1d5da;
                    border-radius: 3px;
                    cursor: pointer;
                }
                .toolbar button:hover {
                    background-color: #f0f0f0;
                }
            `}</style>
        </div>
    );
};

export default CustomMarkdownEditor; 