import React from 'react';
import { InfoIcon, CloseIcon } from '@/lib/icons';

interface StatusIndicatorProps {
    message: string;
    onClose?: () => void;
    type?: 'info' | 'warning' | 'success' | 'error';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    message,
    onClose,
    type = 'info'
}) => {
    return (
        <div style={{
            width: "100%",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#EDF9FF",
            borderRadius: "4px",
            marginBottom: "16px"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
            }}>
                <InfoIcon size={20} color="#6B7280" />
                <span style={{
                    fontSize: "14px",
                    color: "#4B5563"
                }}>
                    {message}
                </span>
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px"
                    }}
                >
                    <CloseIcon size={16} color="#000000" />
                </button>
            )}
        </div>
    );
};

export default StatusIndicator; 