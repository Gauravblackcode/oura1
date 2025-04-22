import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface Oura1DialogProps {
    open: boolean; // Make sure this prop is provided
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

const Oura1Dialog: React.FC<Oura1DialogProps> = ({
    open = false, // Provide a default value
    onClose,
    title,
    children,
    actions
}) => {
    return (
        <Dialog
            open={open} // This should now always have a value
            onClose={onClose}
            aria-labelledby="oura1-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            {title && <DialogTitle id="oura1-dialog-title">{title}</DialogTitle>}
            <DialogContent>
                {children}
            </DialogContent>
            {actions && (
                <DialogActions>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Oura1Dialog;