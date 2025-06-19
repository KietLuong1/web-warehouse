import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudOff, Error as ErrorIcon, Refresh, Warning } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
export default function DashboardError({ error, onRetry, title = 'Dashboard Error', showFallbackNotice = false }) {
    const getErrorDetails = (error) => {
        if (!error)
            return { type: 'unknown', message: 'Unknown error occurred' };
        if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
            return {
                type: 'network',
                message: 'Unable to connect to the server. Please check your internet connection.',
                icon: _jsx(CloudOff, {})
            };
        }
        if (error.response?.status === 404) {
            return {
                type: 'notfound',
                message: 'Dashboard data endpoint not found. Please contact support.',
                icon: _jsx(Warning, {})
            };
        }
        if (error.response?.status >= 500) {
            return {
                type: 'server',
                message: 'Server error occurred. Please try again later.',
                icon: _jsx(ErrorIcon, {})
            };
        }
        if (error.response?.status === 401 || error.response?.status === 403) {
            return {
                type: 'auth',
                message: 'Authentication required. Please log in again.',
                icon: _jsx(Warning, {})
            };
        }
        return {
            type: 'general',
            message: error.message || 'Failed to load dashboard data',
            icon: _jsx(ErrorIcon, {})
        };
    };
    const errorDetails = getErrorDetails(error);
    return (_jsx(Card, { sx: { width: '100%', minHeight: 200 }, children: _jsx(CardContent, { children: _jsxs(Stack, { spacing: 2, alignItems: 'center', justifyContent: 'center', sx: { py: 2 }, children: [_jsx(Box, { sx: { color: 'error.main', fontSize: 48 }, children: errorDetails.icon }), _jsxs(Alert, { severity: 'error', sx: { width: '100%' }, children: [_jsx(AlertTitle, { children: title }), errorDetails.message] }), showFallbackNotice && (_jsxs(Alert, { severity: 'info', sx: { width: '100%' }, children: [_jsx(AlertTitle, { children: "Using Sample Data" }), "Displaying sample data while the dashboard service is unavailable.", _jsx(Box, { sx: { mt: 1 }, children: _jsx(Chip, { label: 'Fallback Mode', color: 'info', variant: 'outlined', size: 'small' }) })] })), _jsxs(Stack, { direction: 'row', spacing: 2, children: [_jsx(Button, { variant: 'contained', startIcon: _jsx(Refresh, {}), onClick: onRetry, color: 'primary', children: "Retry" }), _jsx(Button, { variant: 'outlined', onClick: () => window.location.reload(), children: "Refresh Page" })] }), process.env.NODE_ENV === 'development' && error && (_jsxs(Box, { sx: { mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1, width: '100%' }, children: [_jsx(Typography, { variant: 'caption', color: 'text.secondary', children: _jsx("strong", { children: "Debug Info:" }) }), _jsx(Typography, { variant: 'body2', component: 'pre', sx: {
                                    fontSize: '0.75rem',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }, children: JSON.stringify(error, null, 2) })] }))] }) }) }));
}
