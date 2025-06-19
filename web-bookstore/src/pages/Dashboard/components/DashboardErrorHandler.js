import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Alert, Button, Typography, Box } from '@mui/material';
export default function DashboardErrorHandler({ error, onRetry }) {
    const [showDetails, setShowDetails] = useState(false);
    if (!error)
        return null;
    const is403Error = error.includes('403') || error.includes('Forbidden');
    const userRole = localStorage.getItem('userRole') || 'Unknown';
    const handleRelogin = () => {
        // Clear auth data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        // Redirect to login
        window.location.href = '/login';
    };
    return (_jsxs(Alert, { severity: 'error', sx: { mb: 2 }, action: _jsxs(Box, { sx: { display: 'flex', gap: 1 }, children: [onRetry && (_jsx(Button, { color: 'inherit', size: 'small', onClick: onRetry, children: "Retry" })), _jsx(Button, { color: 'inherit', size: 'small', onClick: handleRelogin, children: "Re-login" })] }), children: [_jsx(Typography, { variant: 'body2', fontWeight: 'bold', children: is403Error ? '🔒 Access Denied' : '❌ Dashboard Error' }), _jsx(Typography, { variant: 'body2', sx: { mt: 1 }, children: is403Error
                    ? `Your account role "${userRole}" may not have permission to access dashboard data.`
                    : 'There was an error loading the dashboard.' }), is403Error && (_jsx(Typography, { variant: 'caption', sx: { display: 'block', mt: 1 }, children: "\uD83D\uDCA1 Contact your administrator to grant dashboard permissions, or try logging in with a different account." })), _jsxs(Button, { size: 'small', onClick: () => setShowDetails(!showDetails), sx: { mt: 1, textTransform: 'none' }, children: [showDetails ? 'Hide' : 'Show', " Error Details"] }), showDetails && (_jsx(Box, { sx: { mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }, children: _jsx(Typography, { variant: 'caption', fontFamily: 'monospace', children: error }) }))] }));
}
